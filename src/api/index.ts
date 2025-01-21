import axios, { AxiosError } from 'axios';

import { TModel } from 'models';

const URL = 'https://mocki.io/v1/6699e4cb-a9f4-44e1-94fd-b77353eaba86';

export async function fetchModels(): Promise<TModel[]> {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).message;
    }
}
