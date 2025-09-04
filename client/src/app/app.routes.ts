import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Shop } from './features/shop/shop';
import { ProductDetails } from './features/shop/product-details/product-details';
import { TestError } from './features/test-error/test-error';
import { ServerError } from './shared/components/server-error/server-error';
import { NotFound } from './shared/components/not-found/not-found';
import { Cart } from './features/cart/cart';
import { Checkout } from './features/checkout/checkout';
import { Login } from './features/account/login/login';
import { Register } from './features/account/register/register';
import { authGuard } from './core/guard/auth-guard';
import { emptyCartGuard } from './core/guard/empty-cart-guard';
import { CheckoutSuccess } from './features/checkout/checkout-success/checkout-success';
import { Order } from './features/orders/order';
import { OrderDetailed } from './features/orders/order-detailed/order-detailed';
import { orderCompleteGuard } from './core/guard/order-complete-guard';
import { Admin } from './features/admin/admin';
import { adminGuard } from './core/guard/admin-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'shop', component: Shop },
    { path: 'shop/:id', component: ProductDetails },
    { path: 'cart', component: Cart },
    { path: 'checkout', component: Checkout, canActivate: [authGuard, emptyCartGuard] },
    { path: 'checkout/success', component: CheckoutSuccess, canActivate: [authGuard, orderCompleteGuard] },
    { path: 'orders', component: Order, canActivate: [authGuard] },
    { path: 'orders/:id', component: OrderDetailed, canActivate: [authGuard] },
    { path: 'account/login', component: Login },
    { path: 'account/register', component: Register },
    { path: 'admin', component: Admin, canActivate: [authGuard, adminGuard] },
    { path: 'test-error', component: TestError },
    { path: 'not-found', component: NotFound },
    { path: 'server-error', component: ServerError },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];
