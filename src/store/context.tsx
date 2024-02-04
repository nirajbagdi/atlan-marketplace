import { createContext, useContext } from 'react';
import { TModel } from 'models';

type ContextState = {
	models: TModel[];
	isLoading: boolean;
	addModel: (modelObj: TModel) => void;
};

const initialState: ContextState = {
	models: [],
	isLoading: true,
	addModel: modelObj => {},
};

export const AppContext = createContext(initialState);
export const useAppCtx = () => useContext(AppContext);
