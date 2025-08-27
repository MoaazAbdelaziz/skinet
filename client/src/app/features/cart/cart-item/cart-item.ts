import { Component, inject, input } from '@angular/core';
import { CartItemType } from '../../../shared/models/cart';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { CartService } from '../../../core/services/cart-service';

@Component({
  selector: 'app-cart-item',
  imports:
    [
      RouterLink,
      MatIcon,
      CurrencyPipe,
      MatButton
    ],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss'
})
export class CartItem {
  item = input.required<CartItemType>();
  protected cartService = inject(CartService);

  incrementQuantity() {
    this.cartService.addItemToCart(this.item());
  }

  decrementQuantity() {
    this.cartService.removeItemFromCart(this.item().productId);
  }

  removeItemFromCart() {
    this.cartService.removeItemFromCart(this.item().productId, this.item().quantity);
  }
}
