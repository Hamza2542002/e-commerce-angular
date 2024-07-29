import { Component } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
  quantity: number;
};
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products!: Product[];
  sortedProducts!: Product[];
  category: string = 'all';
  categories!: string[];
  sorted: boolean = false;
  constructor(
    private readonly productService: ProductServiceService,
    private readonly router: Router,
  ) {
    productService.fetchProducts().subscribe((value) => {
      this.products = (value as any).products as Product[];
    });
    productService
      .fetchCategories()
      .subscribe((value) => (this.categories = value as string[]));
  }

  viewProduct(id: string) {
    this.router.navigate([`products/${id}`]);
  }

  getSelect() {
    this.productService
      .fetchProductCategorie(this.category)
      .subscribe((value) => {
        this.products = (value as any).products as Product[];
      });
  }
  sort() {
    this.getSelect();
    let products = this.products;
    if (this.sorted) {
      products.sort((a: Product, b: Product) => a.price - b.price);
      this.products = products;
    } else {
      this.products = products;
    }
  }
}
