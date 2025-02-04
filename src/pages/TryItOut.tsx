import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as tf from '@tensorflow/tfjs';

import { useAppCtx } from 'store/context';

import Breadcrumb from 'components/Layout/Breadcrumb';
import ModelSpace from 'components/Models/ModelSpace';

import styles from 'styles/components/_ModelSpace.module.scss';

import img from './monkey.jpg';

function loadImageToImageData(
    imageSrc: string,
    callback: (imgData: ImageData) => void
) {
    const img = new Image(); // Create a new image element
    img.src = imageSrc; // Set the source of the image

    img.onload = function () {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        // Set canvas size to match image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Get the ImageData from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Pass the ImageData to the callback
        callback(imageData);
    };

    img.onerror = function () {
        console.error('Failed to load image');
    };
}

async function loadLabels() {
    const response = await fetch(
        'https://storage.googleapis.com/download.tensorflow.org/data/imagenet_class_index.json'
    );
    const data = await response.json();
    return Object.values(data).map((entry) => (entry as [string, string])[1]);
}

// Get top K predicted classes
function getTopKClasses(probabilities: unknown, labels: string[], k = 3) {
    const sortedIndices = [...(probabilities as [])]
        .map((prob, index) => ({ index, prob }))
        .sort((a, b) => b.prob - a.prob) // Sort by probability descending
        .slice(0, k); // Take top K
    console.log(sortedIndices);

    return sortedIndices.map(({ index, prob }) => ({
        className: labels[index] || `Class ${index}`,
        probability: (prob * 100).toFixed(2), // Convert to percentage
    }));
}

const TryItOut = () => {
    const { modelSlug } = useParams();
    const { findModelBySlug } = useAppCtx();

    const [topPredictions, setTopPredictions] = useState<unknown>();

    useEffect(() => {
        (async () => {
            try {
                console.log('fambruhhh');

                const labels = await loadLabels();

                const model = await tf.loadGraphModel(
                    'https://www.kaggle.com/models/google/resnet-v2/TfJs/101-classification/2',
                    { fromTFHub: true }
                );
                console.log(model);

                loadImageToImageData(img, (imgData) => {
                    // Convert image to tensor
                    const tensor = tf.browser
                        .fromPixels(imgData)
                        .resizeNearestNeighbor([224, 224]) // Resize for ResNet input
                        .toFloat()
                        .div(tf.scalar(255)) // Normalize
                        .expandDims(); // Add batch dimension

                    // Run inference using `execute()`
                    const predictions = model.execute(tensor);

                    // Apply softmax to convert logits into probabilities
                    const probabilities = tf.softmax(
                        predictions as tf.Tensor<tf.Rank>
                    );
                    const probsArray = probabilities.dataSync();

                    // console.log(`Predicted class index: ${predictedClassIndex}`);
                    // console.log('Class probabilities:', probabilities.dataSync());

                    const top3 = getTopKClasses(probsArray, labels);
                    setTopPredictions(top3);

                    console.log('Top 3 Predictions:', top3);
                });
            } catch (error) {
                console.error('Error loading the model or processing image:', error);
            }
        })();
    }, []);

    const model = findModelBySlug(modelSlug!);
    if (!model) return null;

    const breadcrumbLinks = [
        { label: 'Models', to: '/' },
        { label: model.name, to: `/models/${model.slug}` },
        { label: 'Try It Out', to: `/models/${model.slug}/try` },
    ];

    return (
        <section className={styles.container}>
            <Breadcrumb links={breadcrumbLinks} />
            <ModelSpace />
        </section>
    );
};

export default TryItOut;
