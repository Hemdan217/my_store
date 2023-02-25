import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  name: string = '';
  address: string = '';
  card: string = '';
  public: boolean = false;
  @Input() total: number = 0;

  constructor(private router: Router, private CartService: CartService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    //
    this.name = this.name;
    this.address = this.address;
    this.card = this.card;

    // this.order.products = this.cart.get();
    // this.order.userdata = this.userdata;
    console.log(this.name);
    // this.cart.saveOrder(this.order);

    this.router.navigateByUrl('/success');
  }

  @Output() newOrder = new EventEmitter<string>();

  makeOrder(value: string) {
    this.newOrder.emit(value);
    this.CartService.clearCart();
  }
}
