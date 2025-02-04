import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as tf from '@tensorflow/tfjs';

import { useAppCtx } from 'store/context';

import Breadcrumb from 'components/Layout/Breadcrumb';
import ModelSpace from 'components/Models/ModelSpace';

import styles from 'styles/components/_ModelSpace.module.scss';

import img from './alligator.jpg';
import { loadImageToImageData } from 'utils';

import { INCEPTION_CLASSES } from './labels';

const TryItOut = () => {
    const { modelSlug } = useParams();
    const { findModelBySlug } = useAppCtx();

    useEffect(() => {
        (async () => {
            const model = await tf.loadGraphModel(
                'https://www.kaggle.com/models/google/inception-v3/TfJs/classification/2',
                { fromTFHub: true }
            );

            loadImageToImageData(img, (imgData) => {
                const tensor = tf.browser
                    .fromPixels(imgData)
                    .resizeNearestNeighbor([224, 224])
                    .toFloat()
                    .div(tf.scalar(255))
                    .expandDims();

                const predictions = model.predict(tensor);

                // const probabilities = tf.softmax(predictions as tf.Tensor<tf.Rank>);
                // const probsArray = probabilities.dataSync();
                // console.log(probsArray);

                const { indices } = tf.topk(predictions as tf.Tensor<tf.Rank>, 3);
                const winners = indices.dataSync();

                console.log(
                    'first place:',
                    INCEPTION_CLASSES[winners[0]],
                    'second place:',
                    INCEPTION_CLASSES[winners[1]],
                    'Third place:',
                    INCEPTION_CLASSES[winners[2]]
                );
            });
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
