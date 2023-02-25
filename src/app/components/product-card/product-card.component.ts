import { Component, Input, EventEmitter } from '@angular/core';
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
    this.cartProducts = this.CartService.updateQuantity(this.product, quantity);
  }
  addToCart(product: Product, quantity: number) {
    this.cartProducts = this.CartService.addToCart(product, quantity);
  }
}
