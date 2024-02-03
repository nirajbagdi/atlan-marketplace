import { createContext, useContext } from 'react';
import { TModel } from 'models';

type ContextState = {
	models: TModel[];
};

const initialState: ContextState = {
	models: [],
};

export const AppContext = createContext(initialState);
export const useAppCtx = () => useContext(AppContext);
