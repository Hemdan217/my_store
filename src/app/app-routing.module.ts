import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { SuccessComponent } from './components/success/success.component';

const routes: Routes = [
  { path: 'home', component: ProductsListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'page/:page', component: ProductsListComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'products/:id', component: ProductItemDetailComponent },
  { path: '', redirectTo: '/page/1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
