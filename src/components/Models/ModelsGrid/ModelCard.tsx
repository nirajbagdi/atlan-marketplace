import { Variants, motion, cubicBezier } from 'framer-motion';

import { TModel } from 'models';

import { ReactComponent as DownloadIcon } from 'assets/download-icon.svg';
import { ReactComponent as HeartIcon } from 'assets/heart-icon.svg';

import styles from 'styles/components/_ModelGrid.module.scss';

type Props = {
	model: TModel;
	shouldTranslate?: boolean;
};

const motionVariants: Variants = {
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

const ModelCard: React.FC<Props> = ({ model, shouldTranslate }) => (
	<motion.article
		initial={{ translateY: shouldTranslate ? '6.4rem' : '0' }}
		variants={motionVariants}
		whileHover="hover"
		whileTap="tap"
		className={styles.card}
	>
		<header>
			<p className={styles.name}>{model.name}</p>
			<span className={styles.category}>{model.category}</span>
		</header>

		<p className={styles.summary}>{model.summary}</p>

		<div className={styles.stats}>
			<p className={styles.heart}>
				<HeartIcon /> {model.stats.likes}
			</p>

			<p className={styles.download}>
				<DownloadIcon /> {model.stats.downloads}
			</p>
		</div>
	</motion.article>
);

export default ModelCard;
