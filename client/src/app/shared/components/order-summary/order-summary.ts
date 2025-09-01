import { CurrencyPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-order-summary',
  imports:
    [
      CurrencyPipe,
      MatFormField,
      MatButton,
      MatLabel,
      MatInput,
      RouterLink
    ],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss'
})
export class OrderSummary {
  protected cartService = inject(CartService)
  protected location = inject(Location);
}
