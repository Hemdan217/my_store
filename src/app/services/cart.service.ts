import { Injectable } from '@angular/core';
import { Product } from '../models/productModel';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts: Product[] = [];
  getcartProducts() {
    return this.cartProducts;
  }

  addToCart(product: Product, quantity: number) {
    product.added = 'yes';
    product.quantity = 1 | quantity;

    this.cartProducts.push(product);

    return this.cartProducts;
  }
  updateQuantity(product: Product, quantity: number) {
    this.cartProducts
      .filter((prod) => prod.id === product.id)
      .map((product) => {
        product.quantity = quantity;
      });
    if (quantity == 0) {
      product.added = 'no';
    }
    return this.cartProducts;
  }

  clearCart() {
    this.cartProducts = [];
    return this.cartProducts;
  }
  constructor() {}
}
