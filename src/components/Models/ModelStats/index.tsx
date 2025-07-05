import { ReactComponent as DownloadIcon } from 'assets/download-icon.svg';
import { ReactComponent as HeartIcon } from 'assets/heart-icon.svg';
import { ReactComponent as ExperimentIcon } from 'assets/experiment-icon.svg';

import styles from 'styles/components/_ModelStats.module.scss';

type Props = {
    noOfLikes: number;
    noOfDownloads: number;
    isAvailableToPlay?: boolean;
};

const formatNum = (num: number) => new Intl.NumberFormat('en-US').format(num);

const ModelStats: React.FC<Props> = ({
    noOfLikes,
    noOfDownloads,
    isAvailableToPlay,
}) => (
    <div className={styles.stats}>
        <p className={styles.heart}>
            <HeartIcon /> {formatNum(noOfLikes)}
        </p>

        <p className={styles.download}>
            <DownloadIcon /> {formatNum(noOfDownloads)}
        </p>

        {isAvailableToPlay && (
            <p className={styles.experiment}>
                <ExperimentIcon />
            </p>
        )}
    </div>
);

export default ModelStats;
