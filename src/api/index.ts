import axios, { AxiosError } from 'axios';

import { TModel } from 'models';

const URL = 'https://mocki.io/v1/2f6128ec-0d2c-468b-be35-5e1f48df1e3f';

export async function fetchModels(): Promise<TModel[]> {
	try {
		const response = await axios.get(URL);
		return response.data;
	} catch (error) {
		throw (error as AxiosError).message;
	}
}
