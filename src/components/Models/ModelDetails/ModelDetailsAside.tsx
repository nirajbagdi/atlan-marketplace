import { TModel } from 'models';

import styles from 'styles/components/_ModelDetails.module.scss';
import ModelStats from '../ModelStats';

type Props = {
	model: TModel;
};

const ModelDetailsAside: React.FC<Props> = ({ model }) => (
	<aside className={styles.aside}>
		<div className={styles.tagSection}>
			<h3>Tags</h3>

			<div className={styles.type}>
				<span className={styles.label}>Task</span>

				<div className={styles.tags}>
					<span>{model.category}</span>
				</div>
			</div>

			<div className={styles.type}>
				<span className={styles.label}>Use Cases:</span>

				<div className={styles.tags}>
					{model.useCases.map(useCase => (
						<span key={useCase}>{useCase}</span>
					))}
				</div>
			</div>
		</div>

		<div className={styles.statsSection}>
			<h3>Statistics</h3>
			<ModelStats noOfLikes={model.stats.likes} noOfDownloads={model.stats.downloads} />
		</div>
	</aside>
);

export default ModelDetailsAside;
