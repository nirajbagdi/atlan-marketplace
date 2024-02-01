import { TModel } from 'models';

import ModelCard from './ModelCard';
import Masonry from 'components/Layout/Masonry';

import styles from 'styles/components/_ModelGrid.module.scss';

type Props = {
	models: TModel[];
	masonry?: boolean;
};

const ModelsGrid: React.FC<Props> = ({ models, masonry }) => {
	const modelsJSX = models.map(model => <ModelCard key={model.id} model={model} />);

	const simpleLayout = <div className={styles.grid}>{modelsJSX}</div>;
	const masonryLayout = <Masonry className={styles.grid}>{modelsJSX}</Masonry>;

	return masonry ? masonryLayout : simpleLayout;
};

export default ModelsGrid;
