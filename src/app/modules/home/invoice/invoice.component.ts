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

  user = {};

  ngOnInit(): void {
    this.service.verifyToken().subscribe(
      res => {
        this.user = res;
        //console.log(res)
        //this.setInvoices(res);
      }
    );
  }

  selectYear: string;
  invoices: Array<any> = [];
  invoicesEmpty: boolean = false;

  search(){
    //console.log(this.service.verifyToken().subscribe(res => {return res;}));
    this.setInvoices(this.user);
    //this.service.verifyToken().subscribe(
    //  res => {
    //    //console.log(res)
    //    this.setInvoices(res);
    //  }
    //);
  }

  setInvoices(user: any){
    this.invoices = [];
    if (this.selectYear) {
      this.service.getInvoice(this.selectYear, user).subscribe(
        res => {
          if (res) {
            //console.log(res)
            this.invoices = res;
            this.invoicesEmpty = (this.invoices.length <= 0 ) ? true : false;
          } else {
            this.invoicesEmpty = (this.invoices.length <= 0 ) ? true : false;
          }
        }
      );
    }
  }

}
