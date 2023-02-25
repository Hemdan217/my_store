import { Injectable } from '@angular/core';
import { Product } from '../models/productModel';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts: Product[] = [];

  userInfo = {
    name: '',
    address: '',
    total: 0,
  };

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
      this.removeProduct(product);
    }
    return this.cartProducts;
  }
  removeProduct(product: Product) {
    this.cartProducts = this.cartProducts.filter(
      (prod) => prod.id != product.id
    );
    return this.cartProducts;
  }
  confirmOrder(name: string, total: number) {
    this.userInfo.name = name;
    this.userInfo.total = total;
    return this.userInfo;
  }
  getUserInfo() {
    return this.userInfo;
  }
  clearCart() {
    this.cartProducts = [];

    return this.cartProducts;
  }
  clearUser() {
    this.userInfo = {
      name: '',
      address: '',
      total: 0,
    };

    return this.userInfo;
  }

  constructor() {}
}
