import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  userInfo = {
    name: '',
    address: '',
    total: 0,
  };
  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  constructor(private CartService: CartService) {}
  ngOnInit(): void {
    const { name, total } = this.CartService.getUserInfo();
    this.userInfo.name = name;
    this.userInfo.total = total;
  }
  clearAll() {
    this.CartService.clearUser();
  }
}
