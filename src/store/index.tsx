import { useState, useEffect } from 'react';

import { AppContext } from './context';
import { TModel } from 'models';
import { fetchModels } from 'api';

type Props = {
	children: React.ReactNode;
};

const AppProvider: React.FC<Props> = ({ children }) => {
	const [models, setModels] = useState<TModel[]>([]);

	useEffect(() => {
		(async () => {
			const fetchedModels = await fetchModels();
			setModels(fetchedModels);
		})();
	}, []);

	const contextValue = { models };
	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
