import axios, { AxiosError } from "axios";

import { TModel } from "models";

const URL = "https://mocki.io/v1/237de143-7c8a-41ab-a32d-1fac7965026f";

export async function fetchModels(): Promise<TModel[]> {
	try {
		const response = await axios.get(URL);
		return response.data;
	} catch (error) {
		throw (error as AxiosError).message;
	}
}
