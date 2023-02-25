import { Component } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/productModel';
import { ProductsService } from '../../services/products.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent {
  id: any;
  product: Product;
  faShoppingCart = faShoppingCart;

  faArrowLeft = faArrowLeft;
  message: string = '';
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
  }
  getValue(event: Event): number {
    return parseInt((event.target as HTMLInputElement).value);
  }
  updateQuantity(quantity: number) {
    this.product.quantity = quantity;
    this.cartProducts = this.CartService.updateQuantity(this.product, quantity);
  }
  addToCart(product: Product, quantity: number) {
    this.message = `${product.name} was added to cart`;
    this.cartProducts = this.CartService.addToCart(product, quantity);
  }
}
