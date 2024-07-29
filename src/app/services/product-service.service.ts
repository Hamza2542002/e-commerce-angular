import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'https://dummyjson.com/products';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private readonly http: HttpClient) {}
  fetchProducts() {
    return this.http.get(API);
  }
  fetchProduct(id: string | null) {
    if (id == null) return;
    return this.http.get(`${API}/${id}`);
  }

  fetchProductCategorie(category: string) {
    return this.http.get(
      category === 'all' ? API : `${API}/category/${category}`,
    );
  }

  fetchCategories() {
    return this.http.get(`${API}/category-list`);
  }
}
