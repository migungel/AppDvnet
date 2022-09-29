import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-invoice',
  templateUrl: './info-invoice.component.html',
  styleUrls: ['./info-invoice.component.scss']
})
export class InfoInvoiceComponent implements OnInit {

  @Input() invoice_id: string = '';
  @Input() invoice: string = '';
  @Input() date: string = '';
  @Input() state: string = '';
  @Input() auth: string = '';
  @Input() pdf: string = '';
  @Input() xml: string = '';

  constructor() { }

  urlPDF: string = '';

  ngOnInit(): void {
  }

  goToLink(){
    var binary = atob(this.pdf.replace(/\s/g, ''));
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    // create the blob object with content-type "application/pdf"
    var blob = new Blob( [view], { type: "application/pdf" });
    this.urlPDF = URL.createObjectURL(blob);
    //return this.urlPDF;
    window.open(this.urlPDF, "_blank");
  }

}
