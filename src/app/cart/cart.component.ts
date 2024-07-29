import { Component, OnInit } from '@angular/core';
import { Product } from '../products/products.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems!: Product[];

  constructor(private readonly router: Router) {}
  ngOnInit() {
    this.cartItems = localStorage.getItem('items')
      ? JSON.parse(localStorage.getItem('items') as string)
      : [];
  }

  updateQuantity(ammount: number, id: string) {
    const item =
      JSON.parse(localStorage.getItem('items') as string).find(
        (item: Product) => item.id == id,
      ) || {};
    item.quantity += ammount;
    let cartItems =
      JSON.parse(localStorage.getItem('items') as string).filter(
        (item: Product) => item.id !== id,
      ) || [];
    if (item.quantity > 0) {
      this.cartItems = [...cartItems, item];
      localStorage.setItem('items', JSON.stringify(this.cartItems));
    } else {
      this.cartItems = cartItems;
      localStorage.setItem('items', JSON.stringify(cartItems));
    }
  }

  removeFromCart(id: string) {
    let items = JSON.parse(localStorage.getItem('items') as string) || [];
    this.cartItems = items.filter((item: Product) => item.id !== id);
    localStorage.setItem('items', JSON.stringify(this.cartItems));
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}
