import { PopOrderComponent } from './../pop-order/pop-order.component';
import { ServicesService } from './../../core/services/services.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() name: string = '';
  @Input() canton: string = '';
  @Input() direccion: string = '';
  @Input() estado: string = '';
  @Input() saldoPagar: string = '';
  @Input() ultraPuntos: string= '';
  @Input() partner_id: string= '';
  @Input() identification: string= '';
  @Input() partner: string= '';
  @Input() agreement_id: string= '';
  @Input() type_service: string= '';
  @Input() company: string= '';

  constructor(
    private service: ServicesService,
    private dialogOrder: MatDialog,
  ) { }

  orderClient = {};

  ngOnInit(): void {
  }

  details(){
    //console.log(this.agreement_id);
    this.service.getOrders(this.agreement_id).subscribe(
      res => {
        const xml = new DOMParser().parseFromString(res, 'text/xml');
        this.orderClient = {
          order_id: xml.getElementsByTagName('Order_id')[0].textContent,
          order: xml.getElementsByTagName('Order')[0].textContent,
          type_id: xml.getElementsByTagName('Type_id')[0].textContent,
          type: xml.getElementsByTagName('Type')[0].textContent,
          date: xml.getElementsByTagName('Fecha')[0].textContent,
          date_execute: xml.getElementsByTagName('Fecha_ejecutar')[0].textContent,
        };
        this.dialogOrder.open(PopOrderComponent, {
          data: this.orderClient,
          backdropClass: 'backdropBackground',
          panelClass: 'my-class'
        } );
      }
    );
  }

}
