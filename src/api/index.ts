import axios, { AxiosError } from "axios";

import { TModel } from "models";

const URL = "https://mocki.io/v1/9550892c-9665-41b1-8338-172eb6bb4283";

export async function fetchModels(): Promise<TModel[]> {
	try {
		const response = await axios.get(URL);
		return response.data;
	} catch (error) {
		throw (error as AxiosError).message;
	}
}
