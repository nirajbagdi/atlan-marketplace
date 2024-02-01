import { TModel } from 'models';

import ModelsGrid from 'components/Models/ModelsGrid';
import FilterTags from './FilterTags';

import styles from 'styles/components/_AllModels.module.scss';

type Props = {
	models: TModel[];
};

const AllModels: React.FC<Props> = ({ models }) => (
	<section className={styles.models}>
		<header>
			<FilterTags />
			<p>{models.length} Results</p>
		</header>

		<ModelsGrid masonry models={models} />
	</section>
);

export default AllModels;
