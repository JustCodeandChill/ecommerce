import axios from "axios";
import {Basket, BasketItem, BasketTotals} from "../models/basket.ts";
import {Dispatch} from "redux";
import {Product} from "../models/product.ts";
import {setBasket} from "../features/basket/basketSlice.ts";
import {createId} from "@paralleldrive/cuid2";

function createUUID() {
    return createId();
}

class BasketService {
    apiUrl = "http://localhost:8081/api/basket";

    async getBasketFromApi(){
        try {
            const response = await axios.get<Basket>(`${this.apiUrl}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to get basket");
        }
    }
    /**
     * Get the current basket from the API.
     *
     * @returns {Promise<Basket>} The current basket.
     */
     getBasket() {
        try {
            const basketString = localStorage.getItem("basket");
            if (basketString) {
                return JSON.parse(basketString) as Basket;
            } else {
                throw new Error("Basket not found in local storage");
            }
        } catch (error) {
            throw new Error("Failed to get basket " + error);
        }
    }
    /**
     * Returns the current basket, if it exists, from local storage.
     *
     * @returns {Promise<Basket | null>} The current basket, or null if no basket exists.
     */
    private getCurrentBasketFromCache() {
        const basket = localStorage.getItem("basket");
        return basket ? JSON.parse(basket) as Basket : null;
    }

    /**
     * get basket from local storage, crate new basket if not exist
     * basket.items holds all the items in the basket
     * Returns the current basket.
     * Architecture decision: Centralize around Redux, and hydrate it from localStorage on app startup.
     * @returns {Promise<Basket>} The current basket.
     */
    async addItemToBasket(item: Product, quantity: number = 1, dispatch : Dispatch) {
        try {
            // hydrate the basket
            let basket = await this.getCurrentBasketFromCache();
            if (!basket) {
                basket = await this.createNewBasket();
            }
            const itemToAdd = this.mapProductToBasket(item);
            basket.items = this.upsertItem(basket.items,itemToAdd, quantity);
            await this.setBasket(basket, dispatch);

            // calculate totals
            const totals = this.calculateTotals(basket);
            return {basket,totals};
        } catch (error) {
            throw new Error("Failed to get basket " + error);
        }

    }



    /**
     * Creates a new basket.
     *
     * @returns {Promise<Basket>} The new basket.
     */
    private async createNewBasket(): Promise<Basket> {
        try {
            const newBasket : Basket = {
                id: createUUID(),
                items: []
            }
            localStorage.setItem("basket_id", newBasket.id );
            return newBasket;
        } catch (error) {
            throw new Error("Failed to create basket");
        }
    }
    /**
     * Maps a product to a basket item because product and basket may share a few properties but not exactly matching.
     *
     * @param {Product} product - The product to map.
     * @returns {BasketItem} The mapped basket item.
     */
    private mapProductToBasket(product : Product) : BasketItem {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
            pictureUrl: product.imageUrl,
          productBrand: product.brandName,
          productType: product.typeName,
            quantity: 0,
        }
    }

    private upsertItem(items: BasketItem[], itemToAdd : BasketItem, quantity: number) : BasketItem[] {
    const existingItem = items.find(x => x.id === itemToAdd.id);
        // Update
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        // Or insert
        else {
            itemToAdd.quantity = quantity;
            items.push(itemToAdd);
        }
    }

    async removeItemFromBasket(itemId: number | string, dispatch: Dispatch) {
        try {
            const basket = this.getBasket() as Basket;
            if (basket) {
                const itemIndex = basket.items.findIndex((i) => i.id === itemId);

                if (itemIndex != -1) {
                    basket.items.splice(itemIndex, 1);
                    this.setBasket(basket, dispatch);
                }

                // if there is no more item in the basket
                if (basket.items.length === 0) {
                    localStorage.removeItem("basket");
                    localStorage.removeItem("basket_id");
                }
            }
        } catch (error) {
            throw new Error("Failed to remove item from basket");
        }
    }

    async deleteBasket(basketId: string): Promise<void> {
        try {
            await axios.delete(`${this.apiUrl}/${basketId}`);
        } catch (error) {
            throw new Error("Failed to delete basket");
        }
    }

    async setBasket(basket: Basket, dispatch : Dispatch) {
        try {
            await axios.post<Basket>(this.apiUrl, basket);
            localStorage.setItem("basket", JSON.stringify(basket));
            dispatch(setBasket(basket));
        } catch (error) {
            throw new Error("Failed to set basket");
        }
    }
    async incrementItemQuantity(itemId: number, quantity: number = 1, dispatch : Dispatch) {
        const basket = this.getCurrentBasketFromCache();
        if (basket) {
            const item : BasketItem | undefined = basket.items.find((i ) => i.id === itemId);

            if (item) {
                item.quantity += quantity;
                // because quantity can't be less than 1
                if (item.quantity < 1) {
                    item.quantity = 1;
                }
                this.setBasket(basket, dispatch);
            }
        }
    }

    async decrementItemQuantity(itemId: number, quantity: number = 1, dispatch : Dispatch) {
        const basket = this.getCurrentBasketFromCache();
        if (basket) {
            const item : BasketItem | undefined = basket.items.find((i ) => i.id === itemId);

            if (item && item.quantity > 1) {
                item.quantity -= quantity;
                this.setBasket(basket, dispatch);
            }
        }
    }

    private calculateTotals = (basket:Basket) : BasketTotals => {
        const shipping = 0;
        const subTotal = basket.items.reduce((acc,item) =>
            acc + (item.price * item.quantity),0);


        const total = shipping + subTotal;
        return {
            shipping,
            subTotal,
            total
        }
    }
}

export default new BasketService();