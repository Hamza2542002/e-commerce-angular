import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../products/products.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  product!: Product;
  productinCart!: boolean;
  constructor(
    private readonly productService: ProductServiceService,
    private route: ActivatedRoute,
    private navigate: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.fetchProduct(id)?.subscribe((value) => {
      this.product = value as Product;
      this.isProductAdded(this.product.id);
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

  isProductAdded(productId: string) {
    let cartItems: Product[] = localStorage.getItem('items')
      ? JSON.parse(localStorage.getItem('items') as string)
      : [];
    const ele = cartItems.find((el) => el.id == productId);
    this.productinCart = Boolean(ele);
    console.log(this.productinCart);
  }
}
