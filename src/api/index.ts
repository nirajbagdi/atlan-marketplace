import axios, { AxiosError } from 'axios';

import { TModel } from 'models';

const URL = 'https://mocki.io/v1/f2492753-fd32-4227-9907-cab22a3e8399';

export async function fetchModels(): Promise<TModel[]> {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).message;
    }
}
