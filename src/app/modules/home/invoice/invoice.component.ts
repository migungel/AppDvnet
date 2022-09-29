import { ServicesService } from './../../../core/services/services.service';
import { EncryptService } from './../../../core/storage/encrypt.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class InvoiceComponent implements OnInit {

  // model: NgbDateStruct;
  // date: {year: number, month: number};

  constructor(
    // private calendar: NgbCalendar
    private storage: EncryptService,
    private service: ServicesService,
  ) {
  }

  ngOnInit(): void {
  }

  selectYear: string;
  partner_id: string;
  invoices: Array<any> = [];
  invoicesEmpty: boolean = false;

  search(){
    this.partner_id = this.storage.getDataJson('currentUser')['user_id'];
    this.setInvoices(this.partner_id);
  }

  setInvoices(partner_id: string){
    this.invoices = [];
    partner_id = "107841";
    if (this.selectYear) {
      this.service.getInvoice(partner_id).subscribe(
        res =>{
          const xml = new DOMParser().parseFromString(res, 'text/xml');
          const invoicesXml = xml.getElementsByTagName('DVInvoices');
          for(let c=0 ; c < invoicesXml.length; c++){
            var invoice = {
              'invoice_id': invoicesXml[c].getElementsByTagName('Invoice_id')[0].textContent,
              'invoice': invoicesXml[c].getElementsByTagName('Invoice')[0].textContent,
              'date': invoicesXml[c].getElementsByTagName('Fecha')[0].textContent,
              'state': invoicesXml[c].getElementsByTagName('State')[0].textContent,
              'auth': invoicesXml[c].getElementsByTagName('Autorizacion')[0].textContent,
              'pdf': invoicesXml[c].getElementsByTagName('Pdf')[0].textContent,
              'xml': invoicesXml[c].getElementsByTagName('Xml')[0].textContent,
            };
            if ( invoice['date'] && (invoice['date'].split('-')[0]==this.selectYear) ) {
              this.invoices.push(invoice);
            }
          }
          this.invoicesEmpty = (this.invoices.length <= 0) ? true : false;
        }
      );
    }
  }

  // @ViewChild('dp', { static: false })
  // private picker!: MatDatepicker<Date>;

  // chosenYearHandler(normalizedYear: Date) {
  //   //const ctrlValue = this.date.value;
  //   //ctrlValue.year(normalizedYear.getFullYear());
  //   console.log(normalizedYear.getFullYear());
  //   this.picker.close()
  // }

}
