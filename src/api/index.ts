import axios, { AxiosError } from 'axios';

import { TModel } from 'models';

const URL = 'https://mocki.io/v1/8ba834b5-7bab-4f95-a16c-a4c020de368a';

export async function fetchModels(): Promise<TModel[]> {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).message;
    }
}
