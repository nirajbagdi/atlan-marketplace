import { TModel } from 'models';
import ModelsGrid from './ModelsGrid';
import { ReactComponent as IconFeatured } from 'assets/icon-featured.svg';

import styles from 'styles/components/_FeaturedModels.module.scss';

type Props = {
	models: TModel[];
};

const FeaturedModels: React.FC<Props> = ({ models }) => (
	<section className={styles.featured}>
		<header>
			<IconFeatured />
			<h3>Featured Models</h3>
		</header>

		<div className={styles.items}>
			<ModelsGrid models={models} />
		</div>
	</section>
);

export default FeaturedModels;
