import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';

import { useAppCtx } from 'store/context';
import modelConfig from 'config';

import Breadcrumb from 'components/Layout/Breadcrumb';

import styles from 'styles/components/_ModelSpace.module.scss';

const TryItOut = () => {
    const { modelSlug } = useParams();
    const { findModelBySlug } = useAppCtx();

    const [loadedModel, setLoadedModel] = useState<tf.GraphModel | null>(null);
    const [error, setError] = useState<string | null>(null);

    const model = findModelBySlug(modelSlug!);
    const modelEntry = modelConfig[modelSlug as keyof typeof modelConfig];

    const ModelComponent = modelEntry.component;

    const breadcrumbLinks = [
        { label: 'Models', to: '/' },
        { label: model.name, to: `/models/${model.slug}` },
        { label: 'Try It Out', to: `/models/${model.slug}/try` },
    ];

    useEffect(() => {
        (async () => {
            try {
                const tfModelInstance = await tf.loadGraphModel(modelEntry.baseUrl, {
                    fromTFHub: modelEntry.fromTfHub,
                });

                setLoadedModel(tfModelInstance);
            } catch (error) {
                setError('Failed to load model. Please try again.');
                console.error('Error loading model:', error);
            }
        })();
    }, [modelEntry.baseUrl, modelEntry.fromTfHub]);

    // TODO: Models with no processing option shouldn't show a "TryItOut" Page
    if (!modelEntry || !modelEntry.component) {
        return (
            <section className={styles.container}>
                <Breadcrumb links={breadcrumbLinks} />
                <p>No Component Available</p>
            </section>
        );
    }

    return (
        <section className={styles.container}>
            <Breadcrumb links={breadcrumbLinks} />

            <div className={styles.space}>
                {!loadedModel && !error && <p>Loading Model...</p>}
                {error && <p>{error}</p>}

                {loadedModel && !error && (
                    <ModelComponent model={modelEntry} loadedModel={loadedModel} />
                )}
            </div>
        </section>
    );
};

export default TryItOut;
