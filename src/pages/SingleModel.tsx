import { useParams } from 'react-router-dom';

import { useAppCtx } from 'store/context';

import Breadcrumb from 'components/Layout/Breadcrumb';
import ModelDetails from 'components/Models/ModelDetails';

import styles from 'styles/components/_ModelDetails.module.scss';

const SingleModel = () => {
	const { modelSlug } = useParams();
	const { models } = useAppCtx();

	const model = models.find(model => model.slug === modelSlug);
	if (!model) return null;

	const breadcrumbLinks = [
		{ label: 'Models', to: '/' },
		{ label: model.name, to: `/models/${model.slug}` },
	];

	return (
		<div className={styles.container}>
			<Breadcrumb links={breadcrumbLinks} />
			<ModelDetails model={model!} />
		</div>
	);
};

export default SingleModel;
