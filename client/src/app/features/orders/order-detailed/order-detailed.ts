import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderType } from '../../../shared/models/order';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { AddressPipe } from "../../../shared/pipes/address-pipe";
import { PaymentCardPipe } from "../../../shared/pipes/payment-card-pipe";
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-detailed',
  imports: [
    MatCardModule,
    MatButton,
    AddressPipe,
    PaymentCardPipe,
    DatePipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './order-detailed.html',
  styleUrl: './order-detailed.scss'
})
export class OrderDetailed implements OnInit {
  private orderService = inject(OrderService);
  private activatedRoute = inject(ActivatedRoute);
  order?: OrderType;

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.orderService.getOrderDetailed(+id).subscribe({
      next: order => this.order = order
    });
  }
}