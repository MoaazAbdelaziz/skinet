import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { CartItem } from "./cart-item/cart-item";
import { OrderSummary } from "../../shared/components/order-summary/order-summary";
import { EmptyState } from "../../shared/components/empty-state/empty-state";

@Component({
  selector: 'app-cart',
  imports: [CartItem, OrderSummary, EmptyState],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
  protected cartService = inject(CartService);
}
