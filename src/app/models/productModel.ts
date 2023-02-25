export class Product {
  id: number;
  name: string;
  url: string;
  price: number;
  description: any;
  quantity: number;
  added?: string;

  constructor() {
    this.id = 1;
    this.name = '';
    this.url = '';
    this.price = 1;
    this.quantity = 1;
  }
}
