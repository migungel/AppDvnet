import { SupportComponent } from './support/support.component';
import { ProductsComponent } from './products/products.component';
import { PointsComponent } from './points/points.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './info/info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'info',
    component: InfoComponent,
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'points',
    component: PointsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'support',
    component: SupportComponent,
  },
  {
    path: '',
    redirectTo: 'info',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
