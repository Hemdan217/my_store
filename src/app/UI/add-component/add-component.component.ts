import { Component, Input } from '@angular/core';
import { Product } from '../../models/productModel';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css'],
})
export class AddComponentComponent {
  faShoppingCart = faShoppingCart;
  @Input() product: Product;
  constructor() {
    this.product = {
      id: 1,
      name: '',
      url: '',
      price: 1,
      description: '',
      quantity: 1,
    };
  }
}
