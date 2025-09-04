import { Component, inject, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SignalrService } from '../../../core/services/signalr-service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddressPipe } from '../../../shared/pipes/address-pipe';
import { PaymentCardPipe } from '../../../shared/pipes/payment-card-pipe';
import { OrderService } from '../../../core/services/order-service';

@Component({
  selector: 'app-checkout-success',
  imports:
    [
      MatButton,
      RouterLink,
      CurrencyPipe,
      DatePipe,
      MatProgressSpinnerModule,
      AddressPipe,
      PaymentCardPipe
    ],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss'
})
export class CheckoutSuccess implements OnDestroy{
  protected signalrService = inject(SignalrService);
  private orderService = inject(OrderService)

  ngOnDestroy(): void {
      this.orderService.orderComplete = false;
      this.signalrService.orderSignal.set(null);
  }
}