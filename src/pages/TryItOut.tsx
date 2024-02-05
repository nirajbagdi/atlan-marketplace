import { useParams } from 'react-router-dom';

import { useAppCtx } from 'store/context';

import Breadcrumb from 'components/Layout/Breadcrumb';

import styles from 'styles/components/_TryItOut.module.scss';

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

			<div className={styles.main}>
				<p>Try {model.name}</p>
			</div>
		</section>
	);
};

export default TryItOut;
