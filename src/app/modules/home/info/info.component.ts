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
    this.userName = this.storage.getDataJson('currentUser')['name'];
    this.identification = this.storage.getDataJson('currentUser')['identification'];
    //console.log(this.storage.getDataJson('currentUser'));
    //console.log(this.storage.getDataJson('credentials'));
    //this.services.getData('2450005885').subscribe(
    this.services.getData('0992860006001').subscribe(
    //this.services.getData(this.identification).subscribe(
      res => {
        const xml = new DOMParser().parseFromString(res, 'text/xml');
        const clientSearch = xml.getElementsByTagName('ClientSearch');
        for(let c=0 ; c < clientSearch.length; c++){
          var contract = {
            'partner_id': clientSearch[c].getElementsByTagName('Partner_id')[0].textContent,
            'identification': clientSearch[c].getElementsByTagName('Identification')[0].textContent,
            'partner': clientSearch[c].getElementsByTagName('Partner')[0].textContent,
            'agreement_id': clientSearch[c].getElementsByTagName('Agreement_id')[0].textContent,
            'agreement': clientSearch[c].getElementsByTagName('Agreement')[0].textContent,
            'state': clientSearch[c].getElementsByTagName('State')[0].textContent,
            'type_service': clientSearch[c].getElementsByTagName('Type_service')[0].textContent,
            'street': clientSearch[c].getElementsByTagName('Street')[0].textContent,
            'canton': clientSearch[c].getElementsByTagName('Canton')[0].textContent,
            'company': clientSearch[c].getElementsByTagName('Company')[0].textContent,
            'valor': clientSearch[c].getElementsByTagName('Valor')[0].textContent,
            'ultrapuntos': clientSearch[c].getElementsByTagName('Ultrapuntos')[0].textContent,
          };
          this.contracts.push(contract);
        }
      }
    );
  }

}
