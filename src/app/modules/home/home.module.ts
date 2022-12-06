import { PointsProductsComponent } from './../../components/points-products/points-products.component';
import { PopOrderComponent } from './../../components/pop-order/pop-order.component';
import { InfoInvoiceComponent } from './../../components/info-invoice/info-invoice.component';
import { CardComponent } from './../../components/card/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PointsComponent } from './points/points.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { SupportComponent } from './support/support.component';


@NgModule({
  declarations: [
    InfoComponent,
    CardComponent,
    ProfileComponent,
    InvoiceComponent,
    PointsComponent,
    InfoInvoiceComponent,
    PointsProductsComponent,
    ProductsComponent,
    SupportComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRippleModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatSliderModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PopOrderComponent]
})
export class HomeModule { }
