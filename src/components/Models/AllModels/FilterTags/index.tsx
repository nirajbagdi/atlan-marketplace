import modelsData from 'data/models.json';

import FilterTag from './FilterTag';

import styles from 'styles/components/_FilterTags.module.scss';

const FilterTags = () => {
	const tags = Array.from(new Set(modelsData.map(model => model.category)));

	const tagsJSX = tags.map(tag => <FilterTag key={tag} tag={tag} />);
	return <div className={styles.tags}>{tagsJSX}</div>;
};

export default FilterTags;
