import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../../models/productModel';
import { CartService } from '../../services/cart.service';
import {
  faShippingFast,
  faGift,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  faShippingFast = faShippingFast;
  faGift = faGift;
  faShoppingCart = faShoppingCart;
  quantity: number = 1;
  message: string = '';
  @Input() product: Product;
  cartProducts: Product[] = [];
  ngOnInit(): void {
    this.cartProducts = this.CartService.getcartProducts();
    this.cartProducts
      .filter((prod) => prod.id === this.product.id)
      .map((product) => {
        this.product.added = 'yes';
        this.product.quantity = product.quantity;
      });
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.cartProducts = this.CartService.getcartProducts();
    this.cartProducts
      .filter((prod) => prod.id === this.product.id)
      .map((product) => {
        this.product.added = 'yes';
        this.product.quantity = product.quantity;
      });
    if (this.product.quantity == 0) {
      this.product.added = 'no';
    }
  }
  constructor(private CartService: CartService) {
    this.product = {
      id: 1,
      name: '',
      url: '',
      price: 1,
      description: '',
      quantity: 1,
    };
  }
  getValue(event: Event): number {
    return parseInt((event.target as HTMLInputElement).value);
  }
  updateQuantity(quantity: number) {
    this.product.quantity = quantity;
    if (this.product.quantity == 0) {
      this.product.added = 'no';
    }

    this.cartProducts = this.CartService.updateQuantity(this.product, quantity);
  }
  addToCart(product: Product, quantity: number) {
    this.message = `${product.name} was added to cart`;
    this.cartProducts = this.CartService.addToCart(product, quantity);
  }
}
