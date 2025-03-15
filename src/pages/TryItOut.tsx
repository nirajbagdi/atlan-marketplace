import { useParams } from 'react-router-dom';

import { useAppCtx } from 'store/context';
import modelConfig from 'config';

import Breadcrumb from 'components/Layout/Breadcrumb';

import styles from 'styles/components/_ModelSpace.module.scss';

const TryItOut = () => {
    const { modelSlug } = useParams();
    const { findModelBySlug } = useAppCtx();

    const model = findModelBySlug(modelSlug!);
    if (!model) return null;

    const breadcrumbLinks = [
        { label: 'Models', to: '/' },
        { label: model.name, to: `/models/${model.slug}` },
        { label: 'Try It Out', to: `/models/${model.slug}/try` },
    ];

    const modelEntry = modelConfig[modelSlug as keyof typeof modelConfig];

    if (!modelEntry || !modelEntry.component) {
        return (
            <section className={styles.container}>
                <Breadcrumb links={breadcrumbLinks} />
                <p>No Component Available</p>
            </section>
        );
    }

    const ModelComponent = modelEntry.component;

    return (
        <section className={styles.container}>
            <Breadcrumb links={breadcrumbLinks} />

            <div className={styles.space}>
                <ModelComponent model={modelEntry} />
            </div>
        </section>
    );
};

export default TryItOut;
