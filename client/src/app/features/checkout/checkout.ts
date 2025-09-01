import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { OrderSummary } from "../../shared/components/order-summary/order-summary";
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ConfirmationToken, StripeAddressElement, StripeAddressElementChangeEvent, StripePaymentElement, StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import { StripeService } from '../../core/services/stripe-service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { SnackbarService } from '../../core/services/snackbar-service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Address } from '../../shared/models/user';
import { AccountService } from '../../core/services/account-service';
import { firstValueFrom } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CheckoutDelivery } from "./checkout-delivery/checkout-delivery";
import { CheckoutReview } from "./checkout-review/checkout-review";
import { CartService } from '../../core/services/cart-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [
    OrderSummary,
    MatStepperModule,
    RouterLink,
    MatButton,
    MatCheckboxModule,
    CheckoutDelivery,
    CheckoutReview,
    CurrencyPipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit, OnDestroy {
  protected stripeService = inject(StripeService);
  protected cartService = inject(CartService);
  private accountService = inject(AccountService);
  private snackService = inject(SnackbarService);
  private router = inject(Router);
  addressElement?: StripeAddressElement;
  paymentElement?: StripePaymentElement;
  saveAddress = false;
  completionStatus = signal<{ address: boolean, card: boolean, delivery: boolean }>({
    address: false,
    card: false,
    delivery: false
  });
  confirmationToken?: ConfirmationToken;
  loading = false;

  async ngOnInit() {
    try {
      this.addressElement = await this.stripeService.createAddressElement();
      this.addressElement.mount('#address-element');
      this.addressElement.on('change', this.handleAddressChange);

      this.paymentElement = await this.stripeService.createPaymentElement();
      this.paymentElement.mount('#payment-element');
      this.paymentElement.on('change', this.handlePaymentChange);
    } catch (error: any) {
      this.snackService.error(error.message);
    }
  }

  handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    this.completionStatus.update(state => {
      state.address = event.complete;
      return state;
    });
  }

  handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    this.completionStatus.update(state => {
      state.card = event.complete;
      return state;
    });
  }

  handleDeliveryChange(event: boolean) {
    this.completionStatus.update(state => {
      state.delivery = event;
      return state;
    });
  }

  async getConfirmationToken() {
    try {
      if (Object.values(this.completionStatus()).every(status => status === true)) {
        const result = await this.stripeService.createConfirmationToken();
        if (result.error) throw new Error(result.error.message);
        this.confirmationToken = result.confirmationToken;
      }
    } catch (error: any) {
      this.snackService.error(error.message);
    }
  }

  async onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      if (this.saveAddress) {
        const address = await this.getAddressFormStripeAddress();
        address && firstValueFrom(this.accountService.updateAddress(address));
      }
    }
    if (event.selectedIndex === 2) {
      await firstValueFrom(this.stripeService.createPaymentIntent());
    }
    if (event.selectedIndex === 3) {
      await this.getConfirmationToken();
    }
  }

  async confirmPayment(stepper: MatStepper) {
    this.loading = true;
    try {
      if (this.confirmationToken) {
        const result = await this.stripeService.confirmPayment(this.confirmationToken);
        if (result.error) throw new Error(result.error.message);
        else {
          this.cartService.deleteCart();
          this.cartService.selectedDelivery.set(null);
          this.router.navigateByUrl('/checkout/success');
        }
      }
    } catch (error: any) {
      this.snackService.error(error.message || 'Something went wrong');
      stepper.previous();
    } finally {
      this.loading = false;
    }
  }

  private async getAddressFormStripeAddress(): Promise<Address | null> {
    const result = await this.addressElement?.getValue();
    const address = result?.value.address;

    if (address) {
      return {
        line1: address.line1,
        line2: address.line2 || undefined,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postal_code
      }
    } else return null;
  }

  onSaveAddressCheckboxChange(event: MatCheckboxChange) {
    this.saveAddress = event.checked;
  }

  ngOnDestroy(): void {
    this.stripeService.disopseElements();
  }
}
