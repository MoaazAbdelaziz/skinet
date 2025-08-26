import { Component } from '@angular/core';
import { Header } from "./layout/header/header";
import { Shop } from "./features/shop/shop";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Skinet';
}
