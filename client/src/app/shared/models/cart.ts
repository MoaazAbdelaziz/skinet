import { nanoid } from "nanoid";

export type CartType = {
    id: string;
    items: CartItemType[];
    deliveryMethodId?: number;
    paymentIntentId?: string;
    clientSecret?: string
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
    deliveryMethodId?: number;
    paymentIntentId?: string;
    clientSecret?: string;
    coupon?: Coupon;
}

export type Coupon = {
    name: string;
    amountOff?: number;
    percentOff?: number;
    promotionCode: string;
    couponId: string;
}