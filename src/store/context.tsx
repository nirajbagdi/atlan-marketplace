import { createContext, useContext } from 'react';
import { TModel } from 'models';

type ContextState = {
	models: TModel[];
	addModel: (modelObj: TModel) => void;
	findModelBySlug: (modelSlug: string) => TModel;
};

const initialState: ContextState = {
	models: [],
	addModel: modelObj => {},
	findModelBySlug: modelSlug => ({} as TModel),
};

export const AppContext = createContext(initialState);
export const useAppCtx = () => useContext(AppContext);
