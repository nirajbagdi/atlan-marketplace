import { TModel } from 'models';
import ModelsGrid from 'components/ModelsGrid';

import styles from 'styles/components/_AllModels.module.scss';

type Props = {
	models: TModel[];
};

const AllModels: React.FC<Props> = ({ models }) => (
	<section className={styles.models}>
		<ModelsGrid masonry models={models} />
	</section>
);

export default AllModels;
