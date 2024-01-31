import { useRef, useState, useEffect } from 'react';

import { TModel } from 'models';
import ModelCard from './ModelCard';

import styles from 'styles/components/_ModelGrid.module.scss';

type Props = {
	models: TModel[];
	masonry?: boolean;
};

const isMiddleColumn = (idx: number, totalColumns: number) => {
	const middleColumnIdx = Math.floor(totalColumns / 2);
	return idx % totalColumns === middleColumnIdx;
};

const ModelsGrid: React.FC<Props> = ({ models, masonry }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [noOfColumns, setNoOfColumns] = useState(3);

	useEffect(() => {
		const updateNoOfColumns = () => {
			const container = containerRef.current;
			const containerWidth = container!.offsetWidth;
			const cardWidth = 350;

			const numColumns = Math.floor(containerWidth / cardWidth);
			setNoOfColumns(numColumns);
		};

		window.addEventListener('resize', updateNoOfColumns);
		updateNoOfColumns();

		return () => window.removeEventListener('resize', updateNoOfColumns);
	}, []);

	return (
		<div className={styles.grid} ref={containerRef}>
			{models.map((model, idx) => (
				<ModelCard
					key={`${model.id}_${noOfColumns}`}
					masonry={masonry}
					model={model}
					shouldTranslate={isMiddleColumn(idx, noOfColumns)}
				/>
			))}
		</div>
	);
};

export default ModelsGrid;
