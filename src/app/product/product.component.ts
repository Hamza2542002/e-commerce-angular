import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  product: any;
  constructor(
    private readonly productService: ProductServiceService,
    private route: ActivatedRoute,
    private navigate: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.fetchProduct(id)?.subscribe((value) => {
      this.product = value as any;
      console.log(this.product);
    });
  }

  addToCart(product: any) {
    let cartItems = localStorage.getItem('items')
      ? JSON.parse(localStorage.getItem('items') as string)
      : [];
    cartItems.push({ ...product, quantity: 1 });
    localStorage.setItem('items', JSON.stringify(cartItems));
    this.navigate.navigate(['/cart']);
  }
}
