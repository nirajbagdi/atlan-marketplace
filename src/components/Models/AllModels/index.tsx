import { useState, useEffect, useCallback } from 'react';

import { TModel } from 'models';

import ModelsGrid from 'components/Models/ModelsGrid';
import FilterTags from './FilterTags';

import styles from 'styles/components/_AllModels.module.scss';

type Props = {
	models: TModel[];
};

const AllModels: React.FC<Props> = ({ models }) => {
	const [filteredModels, setFilteredModels] = useState<TModel[]>([]);

	useEffect(() => {
		setFilteredModels(models);
	}, [models]);

	const handleUpdateResults = useCallback(
		(filterNames: string[]) => {
			const filtered = models.filter(model => filterNames.includes(model.category));
			setFilteredModels(filtered.length ? filtered : models);
		},

		[models]
	);

	return (
		<section className={styles.models}>
			<header>
				<FilterTags onUpdateResults={handleUpdateResults} />

				<p>
					Models <span>{filteredModels.length}</span>
				</p>
			</header>

			<ModelsGrid masonry models={filteredModels} />
		</section>
	);
};

export default AllModels;
