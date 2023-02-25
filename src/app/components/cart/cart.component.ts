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
  message: string = '';
  cartProducts: Product[] = [];

  userInfo = {
    name: '',
    address: '',
    total: 0,
  };
  constructor(private CartService: CartService) {}
  ngOnInit(): void {
    this.cartProducts = this.CartService.getcartProducts();
    this.cartProducts.forEach((product: Product) => {
      this.total += product.price * product.quantity;
    });
    this.total = Math.round(this.total);
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.cartProducts = this.CartService.getcartProducts();
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
    if (quantity == 0) {
      this.message = 'Removed From Cart';
    }
    this.cartProducts = this.CartService.updateQuantity(product, quantity);
  }
  makeOrder(userName: string) {
    this.userInfo.name = userName;
    this.userInfo.total = this.total;
    this.CartService.confirmOrder(this.userInfo.name, this.userInfo.total);
    console.log(this.userInfo);
  }
}
