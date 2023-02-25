import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Product } from '../../models/productModel';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',

  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  products: Product[] = [];
  page: any;
  term = '';
  constructor(
    private ProductsService: ProductsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.page = this.route.snapshot.paramMap.get('page');
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ProductsService.getProducts(
      this.page
        ? `http://localhost:3000/products?_page=${this.page}&_limit=21`
        : 'http://localhost:3000/products'
    ).subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  updatePage(n: number) {
    this.page = n;
    console.log(this.page);
    this.ProductsService.getProducts(
      `http://localhost:3000/products?_page=${this.page}&_limit=21`
    ).subscribe((data: Product[]) => {
      this.products = data;
    });
  }
}
