import axios, { AxiosError } from 'axios';

import { TModel } from 'models';

const URL = 'https://mocki.io/v1/ba3bf37d-f1f3-4cfe-ab46-894378f7ce64';

export async function fetchModels(): Promise<TModel[]> {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).message;
    }
}
