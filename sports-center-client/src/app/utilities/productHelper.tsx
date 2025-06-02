import {Product} from "../models/product.ts";
import {BasketItem} from "../models/basket.ts";

const extractImageName = (item: Product): string | null => {
    if (item != null && item.imageUrl != null) {
        const part = item.imageUrl.split('/');
        if (part.length > 0) {
            return part[part.length - 1];
        }
    }
    return null;
}

const extractImageNameBasketItem = (item: BasketItem): string | null => {
    if (item != null && item.pictureUrl != null) {
        const part = item.pictureUrl.split('/');
        if (part.length > 0) {
            return part[part.length - 1];
        }
    }
    return null;
}

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

export {extractImageName, formatPrice, extractImageNameBasketItem};