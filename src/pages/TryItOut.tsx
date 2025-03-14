import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as tf from '@tensorflow/tfjs';

import { useAppCtx } from 'store/context';

import modelConfig from 'config';
import { loadImageToImageData } from 'utils';

import Breadcrumb from 'components/Layout/Breadcrumb';
import ModelSpace from 'components/Models/ModelSpace';

import styles from 'styles/components/_ModelSpace.module.scss';

import monkeyImg from 'assets/monkey.jpg';

const TryItOut = () => {
    const { modelSlug } = useParams();
    const { findModelBySlug } = useAppCtx();

    useEffect(() => {
        (async () => {
            if (!modelConfig[modelSlug!]) return;

            try {
                const model = modelConfig[modelSlug!];

                const loadedModel = await tf.loadGraphModel(model.baseUrl, {
                    fromTFHub: model.fromTfHub,
                });

                loadImageToImageData(monkeyImg, async (imgData) => {
                    const tensor = model.preprocess(imgData);
                    const predictions = loadedModel.predict(tensor) as tf.Tensor;
                    const result = await model.postprocess(predictions);

                    console.log(result);
                });
            } catch (error) {
                console.log('Error loading model or processing image');
            }
        })();
    }, [modelSlug]);

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
