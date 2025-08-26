import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { MatCard } from "@angular/material/card";
import { MatCardContent } from "@angular/material/card";
import { MatCardActions } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-product-item',
  imports: [MatCard, MatCardContent, MatCardActions, MatIcon, CurrencyPipe, MatButton],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss'
})
export class ProductItem {
  @Input() product?: Product;
}
