import { Variants, motion, cubicBezier } from 'framer-motion';

import { ReactComponent as IconDownload } from 'assets/icon-download.svg';
import { ReactComponent as IconHeart } from 'assets/icon-heart.svg';

import styles from 'styles/components/_ModelCard.module.scss';

type Props = {
	model: {
		name: string;
		category: string;
		summary: string;
		stats: {
			likes: string;
			downloads: string;
		};
	};
};

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

const ModelCard: React.FC<Props> = ({ model }) => (
	<motion.article variants={variants} whileHover="hover" whileTap="tap" className={styles.card}>
		<header>
			<p className={styles.name}>{model.name}</p>
			<span className={styles.category}>{model.category}</span>
		</header>

		<p className={styles.summary}>{model.summary}</p>

		<div className={styles.stats}>
			<p className={styles.heart}>
				<IconHeart /> {model.stats.likes}
			</p>

			<p className={styles.download}>
				<IconDownload /> {model.stats.downloads}
			</p>
		</div>
	</motion.article>
);

export default ModelCard;
