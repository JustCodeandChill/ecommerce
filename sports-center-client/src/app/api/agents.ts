import Axios, {AxiosResponse} from "axios";
import {setupCache} from "axios-cache-interceptor";

const axiosInstance = Axios.create();
const axios = setupCache(axiosInstance);

axios.defaults.baseURL = 'http://localhost:8081/api/';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object)=> axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Store = {
    list: () => requests.get('products/'),
    getProduct: (id: number | string) => requests.get(`products/${id}`)
}

const agent = {
    Store
}

export default agent;