import { useState, ChangeEvent, FormEvent } from 'react';
import * as tf from '@tensorflow/tfjs';

import { ReactComponent as UploadIcon } from 'assets/upload-icon.svg';

import { BaseModelConfig } from 'config/types';
import { loadImageToImageData } from 'utils';

import styles from 'styles/components/_ModelSpace.module.scss';

type Props = {
    model: BaseModelConfig;
};

const ImageToText: React.FC<Props> = ({ model }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [outputText, setOutputText] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const imageFile = event.target.files?.[0];

        if (imageFile) {
            const previewURL = URL.createObjectURL(imageFile);
            setImageUrl(previewURL);
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

                console.log(result);
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
                    <UploadIcon /> Upload Image
                </label>

                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            {imageUrl && (
                <button>{isProcessing ? 'Processing...' : 'Generate Text'}</button>
            )}

            {outputText && <p className={styles.output}>{outputText}</p>}
        </form>
    );
};

export default ImageToText;
