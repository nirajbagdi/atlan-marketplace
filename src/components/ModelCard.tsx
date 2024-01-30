import { Variants, motion, cubicBezier } from 'framer-motion';

import { ReactComponent as IconDownload } from 'assets/icon-download.svg';
import { ReactComponent as IconHeart } from 'assets/icon-heart.svg';

import styles from 'styles/components/_ModelCard.module.scss';

const variants: Variants = {
	hover: {
		scale: 1.02,
		boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
		transition: {
			duration: 1,
			ease: cubicBezier(0.165, 0.84, 0.44, 1),
		},
	},

	tap: { scale: 0.98 },
};

const ModelCard: React.FC = () => (
	<motion.article variants={variants} whileHover="hover" whileTap="tap" className={styles.card}>
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
	</motion.article>
);

export default ModelCard;
