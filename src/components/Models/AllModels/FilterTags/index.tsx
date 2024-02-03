import { useEffect, useState } from 'react';

import { useAppCtx } from 'store/context';

import FilterTag from './FilterTag';

import styles from 'styles/components/_FilterTags.module.scss';

type Props = {
	onUpdateResults: (filters: string[]) => void;
};

const FilterTags: React.FC<Props> = ({ onUpdateResults }) => {
	const [filters, setFilters] = useState<string[]>([]);

	const { models } = useAppCtx();

	useEffect(() => {
		onUpdateResults(filters);
	}, [filters, onUpdateResults]);

	const handleFilterSelect = (filterName: string) => {
		setFilters(prevFilters =>
			prevFilters.includes(filterName)
				? prevFilters.filter(name => name !== filterName)
				: [...prevFilters, filterName]
		);
	};

	const tags = Array.from(new Set(models.map(model => model.category)));

	const tagsJSX = tags.map(tag => (
		<FilterTag key={tag} filterName={tag} onFilterSelect={handleFilterSelect} />
	));

	return <div className={styles.tags}>{tagsJSX}</div>;
};

export default FilterTags;
