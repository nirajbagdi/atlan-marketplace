import axios, { AxiosError } from 'axios';

import { TModel } from 'models';

const URL = 'https://api.jsonbin.io/v3/b/689c7d7e43b1c97be91d6458';

export async function fetchModels(): Promise<TModel[]> {
    try {
        const response = await axios.get(URL);
        return response.data.record;
    } catch (error) {
        throw (error as AxiosError).message;
    }
}
