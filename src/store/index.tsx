import { useState, useEffect } from 'react';

import { AppContext } from './context';
import { TModel } from 'models';
import { fetchModels } from 'api';

type Props = {
	children: React.ReactNode;
};

const AppProvider: React.FC<Props> = ({ children }) => {
	const [models, setModels] = useState<TModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const fetchedModels = await fetchModels();
			setModels(fetchedModels);

			setIsLoading(false);
		})();
	}, []);

	const addModel = (modelObj: TModel) => {
		setModels(prevModels => [modelObj, ...prevModels]);
	};

	const contextValue = { models, addModel, isLoading };
	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
