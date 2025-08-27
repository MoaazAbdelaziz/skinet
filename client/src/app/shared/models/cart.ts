import { nanoid } from "nanoid";

export type CartType = {
    id: string;
    items: CartItemType[];
}

export type CartItemType = {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Cart implements CartType {
    id = nanoid();
    items: CartItemType[] = [];
}