import { useState } from 'react';

import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg';
import { ReactComponent as CheckIcon } from 'assets/check-icon.svg';

import styles from 'styles/components/_FilterTags.module.scss';

type Props = {
	tag: string;
};

const FilterTag: React.FC<Props> = ({ tag }) => {
	const [active, setActive] = useState(false);

	const toggleActive = () => setActive(prev => !prev);

	return (
		<div className={`${styles.tag} ${active ? styles.active : ''}`} onClick={toggleActive}>
			{tag}
			{active ? <CheckIcon /> : <PlusIcon />}
		</div>
	);
};

export default FilterTag;
