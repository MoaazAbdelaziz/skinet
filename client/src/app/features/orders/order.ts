import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order-service';
import { OrderType } from '../../shared/models/order';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  imports:
    [
      DatePipe,
      CurrencyPipe,
      RouterLink
    ],
  templateUrl: './order.html',
  styleUrl: './order.scss'
})
export class Order implements OnInit {
  private orderService = inject(OrderService);
  orders: OrderType[] = [];

  ngOnInit(): void {
    this.orderService.getOrdersForUser().subscribe({
      next: orders => this.orders = orders,
    });
  }
}