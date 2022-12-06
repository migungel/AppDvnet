import { ServicesService } from './../../../core/services/services.service';
import { EncryptService } from '../../../core/storage/encrypt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(
    private storage: EncryptService,
    private services: ServicesService,
  ) { }

  userName: string = "";
  identification: string = "";
  contracts: Array<any> = [];
  // contracts = [
  //   // {
  //   //   name: 'name',
  //   //   canton: 'canton',
  //   //   direccion: 'direccion',
  //   //   estado: 'estado',
  //   //   saldoPagar: 'saldoPagar',
  //   //   ultraPuntos: 'ultraPuntos'
  //   // },
  //   // {
  //   //   name: 'nombre contr',
  //   //   canton: 'daule',
  //   //   direccion: 'calle 1 y 2',
  //   //   estado: 'activo',
  //   //   saldoPagar: '30.20',
  //   //   ultraPuntos: '150'
  //   // }
  // ];

  ngOnInit(): void {
    this.startValues();
  }

  startValues(){
    this.services.verifyToken().subscribe(
      res => {
        console.log(res);
        this.userName = res.name;
        this.identification = res.identification;
        this.dataPartner(res);
      }
    );
  }

  dataPartner(data: any){
    this.services.getData(data).subscribe(
      res => {
        this.contracts = res;
      }
    );
  }

}
