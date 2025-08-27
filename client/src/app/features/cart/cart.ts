import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { CartItem } from "./cart-item/cart-item";
import { OrderSummary } from "../../shared/components/order-summary/order-summary";

@Component({
  selector: 'app-cart',
  imports: [CartItem, OrderSummary],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
  protected cartService = inject(CartService);
}
