import { ReactComponent as IconDownload } from 'assets/icon-download.svg';
import { ReactComponent as IconHeart } from 'assets/icon-heart.svg';

import styles from 'styles/components/_ModelCard.module.scss';

const ModelCard: React.FC = () => (
	<article className={styles.card}>
		<header>
			<p className={styles.name}>Transformers</p>
			<span className={styles.category}>Creative</span>
		</header>

		<p className={styles.summary}>
			State-of-the-art ML for Pytorch,
			<br /> TensorFlow, and JAX.
		</p>

		<div className={styles.stats}>
			<p className={styles.heart}>
				<IconHeart /> 21, 366
			</p>

			<p className={styles.download}>
				<IconDownload /> 300+
			</p>
		</div>
	</article>
);

export default ModelCard;
