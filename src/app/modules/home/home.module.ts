import { CardComponent } from './../../components/card/card.component';
import { CarouselComponent } from './../../components/carousel/carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InfoComponent } from './info/info.component';
import { OtherComponent } from './other/other.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    InfoComponent,
    OtherComponent,
    CardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
