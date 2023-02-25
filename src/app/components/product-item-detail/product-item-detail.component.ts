import { Component } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/productModel';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent {
  id: any;
  product: Product;
  faShoppingCart = faShoppingCart;
  cartProducts: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private ProductsService: ProductsService,
    private CartService: CartService
  ) {
    this.id = '1';
    this.product = {
      id: 1,
      name: '',
      url: '',
      price: 1,
      description: {},
      quantity: 1,
    };
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ProductsService.getProductDetails(`${this.id}`).subscribe(
      (data: Product) => {
        this.product = data;
      }
    );
    this.cartProducts = this.CartService.getcartProducts();
    this.cartProducts.map((product) => {
      this.product.added = this.product.id === product.id ? 'yes' : 'no';
      this.product.quantity = product.quantity;
    });
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
