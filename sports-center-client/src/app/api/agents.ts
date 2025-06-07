import Axios, {AxiosError, AxiosResponse} from "axios";
import {setupCache} from "axios-cache-interceptor";
import {router} from "../router/Routes.tsx";
import {toast} from "react-toastify";
import basketService from "./basketService.ts";
import {Dispatch} from "redux";
import {Product} from "../models/product.ts";
import {Basket} from "../models/basket.ts";

const axiosInstance = Axios.create();
const axios = setupCache(axiosInstance);

axios.defaults.baseURL = 'http://localhost:8081/api/';

const responseBody = (response: AxiosResponse) => response.data;


axios.interceptors.response.use(async (response) => {
    return response;
}, (error: AxiosError) => {
    const {status} = error.response as AxiosResponse;
    switch (status) {
        case 404:
            toast.error("Resources not found");
            router.navigate('not-found');
            break;
        case 500:
            toast.error("Internal server error");
            router.navigate('/server-error');
            break;
        default:
            break;
    }

    return Promise.reject(error.message);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object)=> axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Store = {
    list: () => requests.get('products/'),
    getProduct: (id: number | string) => requests.get(`products/${id}`),
    details: (id: number) => requests.get(`products/${id}`),
    types: () => requests.get('products/types')
        .then(types => [{id: 0, name: 'All'}, ...types]),
    brands: () => requests.get('products/brands')
        .then(types => [{id: 0, name: 'All'}, ...types]),
    search: (keyword: string) => requests.get(`products?keyword=${keyword}`),

}

const Basket = {
    get: async() => {
        try {
            return await basketService.getBasket();
        } catch (error) {
            throw new Error("Failed to get basket" + error);
        }
    },
    addItem: async(product: Product, dispatch: Dispatch) => {
        try {
            const result = await basketService.addItemToBasket(product, 1, dispatch);
            console.log(result);
            return result;
        } catch (error) {
            throw new Error("Failed to add item to basket" + error);
        }
    },
    removeItem: async (itemId: number, dispatch: Dispatch)=>{
        try{
            await basketService.remove(itemId, dispatch);
        }catch(error){
            console.error("Failed to remove an item from basket:", error);
            throw error;
        }
    },
    incrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
        try {
            await basketService.incrementItemQuantity(itemId, quantity, dispatch);
        } catch (error) {
            console.error("Failed to increment item quantity in basket:", error);
            throw error;
        }
    },
    decrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
        try {
            await basketService.decrementItemQuantity(itemId, quantity, dispatch);
        } catch (error) {
            console.error("Failed to decrement item quantity in basket:", error);
            throw error;
        }
    },
    setBasket: async (basket: Basket, dispatch: Dispatch) => {
        try {
            await basketService.setBasket(basket, dispatch);
        } catch (error) {
            console.error("Failed to set basket:", error);
            throw error;
        }
    },
    deleteBasket: async(basketId: string) =>{
        try{
            await basketService.deleteBasket(basketId);
        } catch(error){
            console.log("Failed to delete the Basket");
            throw error;
        }
    }
}

const agent = {
    Store,
    Basket
}

export default agent;