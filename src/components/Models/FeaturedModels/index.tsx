import { TModel } from 'models';

import ModelsGrid from 'components/Models/ModelsGrid';
import { ReactComponent as FeaturedIcon } from 'assets/featured-icon.svg';

import styles from 'styles/components/_FeaturedModels.module.scss';

type Props = {
	models: TModel[];
};

const FeaturedModels: React.FC<Props> = ({ models }) => (
	<section className={styles.featured}>
		<header>
			<FeaturedIcon />
			<h3>Featured Models</h3>
		</header>

		<div className={styles.items}>
			<ModelsGrid models={models} />
		</div>
	</section>
);

export default FeaturedModels;
