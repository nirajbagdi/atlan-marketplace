import React, { useRef, useState, useEffect } from 'react';

type Props = {
	children: React.ReactNode;
	className?: string;
};

const isMiddleColumn = (idx: number, totalColumns: number) => {
	const middleColumnIdx = Math.floor(totalColumns / 2);
	return idx % totalColumns === middleColumnIdx;
};

const Masonry: React.FC<Props> = ({ children, className }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [noOfColumns, setNoOfColumns] = useState(3);

	useEffect(() => {
		const updateNoOfColumns = () => {
			const container = containerRef.current;
			const containerWidth = container!.offsetWidth;
			const cardWidth = container!.children[0].clientWidth;

			const numColumns = Math.floor(containerWidth / cardWidth);
			setNoOfColumns(numColumns);
		};

		window.addEventListener('resize', updateNoOfColumns);
		updateNoOfColumns();

		return () => window.removeEventListener('resize', updateNoOfColumns);
	}, []);

	return (
		<div className={className} ref={containerRef}>
			{React.Children.map(children, (child, idx) =>
				React.cloneElement(child as React.ReactElement, {
					key: `${idx}_${noOfColumns}`,
					shouldTranslate: isMiddleColumn(idx, noOfColumns),
				})
			)}
		</div>
	);
};

export default Masonry;
