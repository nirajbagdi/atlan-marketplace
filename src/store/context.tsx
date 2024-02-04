import { createContext, useContext } from 'react';
import { TModel } from 'models';

type ContextState = {
	models: TModel[];
	addModel: (modelObj: TModel) => void;
};

const initialState: ContextState = {
	models: [],
	addModel: modelObj => {},
};

export const AppContext = createContext(initialState);
export const useAppCtx = () => useContext(AppContext);
