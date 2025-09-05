import { Route } from "@angular/router";
import { authGuard } from "../../core/guard/auth-guard";
import { emptyCartGuard } from "../../core/guard/empty-cart-guard";
import { orderCompleteGuard } from "../../core/guard/order-complete-guard";
import { Checkout } from "./checkout";
import { CheckoutSuccess } from "./checkout-success/checkout-success";

export const checkoutRoutes: Route[] = [
    { path: '', component: Checkout, canActivate: [authGuard, emptyCartGuard] },
    { path: 'success', component: CheckoutSuccess, canActivate: [authGuard, orderCompleteGuard] },
];