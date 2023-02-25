import { Component, Input } from '@angular/core';
import { Product } from '../../models/productModel';
import { CartService } from '../../services/cart.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  faShoppingCart = faShoppingCart;
  total: number = 0;

  cartProducts: Product[] = [];
  constructor(private CartService: CartService) {}
  ngOnInit(): void {
    this.cartProducts = this.CartService.getcartProducts();
    this.cartProducts.forEach((product: Product) => {
      this.total += product.price * product.quantity;
    });
    this.total = Math.round(this.total);
  }
  getValue(event: Event): number {
    this.cartProducts = this.CartService.getcartProducts();
    this.total = 0;
    this.cartProducts.forEach((product: Product) => {
      this.total += product.price * product.quantity;
    });
    this.total = Math.round(this.total);
    return parseInt((event.target as HTMLInputElement).value);
  }

  updateQuantity(product: Product, quantity: number) {
    this.cartProducts = this.CartService.updateQuantity(product, quantity);
  }
}
