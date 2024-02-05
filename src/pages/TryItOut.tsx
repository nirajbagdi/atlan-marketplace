import { useParams } from 'react-router-dom';

import { useAppCtx } from 'store/context';

import Breadcrumb from 'components/Layout/Breadcrumb';
import ModelSpace from 'components/Models/ModelSpace';

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

	return (
		<section className={styles.container}>
			<Breadcrumb links={breadcrumbLinks} />
			<ModelSpace />
		</section>
	);
};

export default TryItOut;
