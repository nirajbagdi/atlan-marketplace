import { useState } from 'react';

import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg';
import { ReactComponent as CheckIcon } from 'assets/check-icon.svg';

import styles from 'styles/components/_FilterTags.module.scss';

type Props = {
	filterName: string;
	onFilterSelect: (filterName: string) => void;
};

const FilterTag: React.FC<Props> = ({ filterName, onFilterSelect }) => {
	const [active, setActive] = useState(false);

	const handleClick = (event: React.MouseEvent) => {
		onFilterSelect(event.currentTarget.textContent || '');
		setActive(prev => !prev);
	};

	return (
		<div className={`${styles.tag} ${active ? styles.active : ''}`} onClick={handleClick}>
			{filterName}
			{active ? <CheckIcon /> : <PlusIcon />}
		</div>
	);
};

export default FilterTag;
