import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Shop } from './features/shop/shop';
import { ProductDetails } from './features/shop/product-details/product-details';
import { TestError } from './features/test-error/test-error';
import { ServerError } from './shared/components/server-error/server-error';
import { NotFound } from './shared/components/not-found/not-found';
import { Cart } from './features/cart/cart';
import { authGuard } from './core/guard/auth-guard';
import { adminGuard } from './core/guard/admin-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'shop', component: Shop },
    { path: 'shop/:id', component: ProductDetails },
    { path: 'cart', component: Cart },
    { path: 'checkout', loadChildren: () => import('./features/checkout/routes').then(r => r.checkoutRoutes) },
    { path: 'orders', loadChildren: () => import('./features/orders/routes').then(r => r.orderRoutes) },
    { path: 'account', loadChildren: () => import('./features/account/routes').then(r => r.accountRoutes) },
    { path: 'admin', loadComponent: () => import('./features/admin/admin').then(c => c.Admin), canActivate: [authGuard, adminGuard] },
    { path: 'test-error', component: TestError },
    { path: 'not-found', component: NotFound },
    { path: 'server-error', component: ServerError },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];
