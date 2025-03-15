import { useState, ChangeEvent, FormEvent } from 'react';
import * as tf from '@tensorflow/tfjs';

import { ReactComponent as UploadIcon } from 'assets/upload-icon.svg';

import { BaseModelConfig, ClassificationResult } from 'config/types';
import { loadImageToImageData } from 'utils';

import styles from 'styles/components/_ModelSpace.module.scss';

type Props = {
    model: BaseModelConfig;
};

const ImageClassifier: React.FC<Props> = ({ model }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [predictions, setPredictions] = useState<ClassificationResult[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const imageFile = event.target.files?.[0];

        if (imageFile) {
            const previewURL = URL.createObjectURL(imageFile);
            setImageUrl(previewURL);
            setPredictions([]);
        }
    };

    const runModel = async (inputImgUrl: string) => {
        setIsProcessing(true);

        try {
            const loadedModel = await tf.loadGraphModel(model.baseUrl, {
                fromTFHub: model.fromTfHub,
            });

            loadImageToImageData(inputImgUrl, async (imgData) => {
                const tensor = model.preprocess(imgData);
                const predictions = loadedModel.predict(tensor) as tf.Tensor;
                const result = await model.postprocess(predictions);

                setPredictions(result);
            });
        } catch (error) {
            console.log('Error loading model or processing image');
        }

        setIsProcessing(false);
    };

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!imageUrl) return;
        runModel(imageUrl);
    };

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <div className={styles.image}>
                {imageUrl && <img src={imageUrl} alt="Uploaded Preview" />}
            </div>

            <div className={styles.input}>
                <label htmlFor="image">
                    <UploadIcon /> Choose an Image
                </label>

                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            {imageUrl && predictions.length === 0 && (
                <button disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Classify Image'}
                </button>
            )}

            {predictions.length > 0 && (
                <div className={styles.output}>
                    <h3>Predictions</h3>

                    <ol>
                        {predictions.map((prediction, idx) => (
                            <li key={idx}>
                                {prediction.className} — {prediction.probability}
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </form>
    );
};

export default ImageClassifier;
