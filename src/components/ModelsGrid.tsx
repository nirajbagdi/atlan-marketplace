import { TModel } from 'models';
import ModelCard from './ModelCard';
import Masonry from './Masonry';

import styles from 'styles/components/_ModelGrid.module.scss';

type Props = {
	models: TModel[];
	masonry?: boolean;
};

const ModelsGrid: React.FC<Props> = ({ models, masonry }) => {
	const simpleLayout = (
		<div className={styles.grid}>
			{models.map(model => (
				<ModelCard key={model.id} model={model} />
			))}
		</div>
	);

	const masonryLayout = (
		<Masonry className={styles.grid}>
			{models.map(model => (
				<ModelCard key={model.id} model={model} />
			))}
		</Masonry>
	);

	return masonry ? masonryLayout : simpleLayout;
};

export default ModelsGrid;
