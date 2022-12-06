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
  cod: string = '';

  constructor(
    private service: ServicesService,
    private dialogOrder: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cod = this.name.replace("OP","").replace("-","");
  }

  details(){
    this.service.getOrders(this.agreement_id).subscribe(
      res => {
        let orderClient = {
          order_id: res.order_id,
          order: res.order,
          type_id: res.type_id,
          type: res.type,
          date: res.fecha,
          date_execute: res.fecha_ejecutar,
        };
        this.dialogOrder.open(PopOrderComponent, {
          data: orderClient,
          backdropClass: 'backdropBackground',
          panelClass: 'my-class'
        } );
      }
    );
  }

}
