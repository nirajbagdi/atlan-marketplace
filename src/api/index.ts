import axios, { AxiosError } from "axios";

import { TModel } from "models";

const URL = "https://mocki.io/v1/2f678e1b-aab9-4fc7-b2f1-d62b3f426be5";

export async function fetchModels(): Promise<TModel[]> {
	try {
		const response = await axios.get(URL);
		return response.data;
	} catch (error) {
		throw (error as AxiosError).message;
	}
}
