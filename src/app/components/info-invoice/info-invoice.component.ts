import { Component, ElementRef, Input, OnInit } from '@angular/core';

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
  buttonCopy: string = 'Copiar clave de acceso';

  ngOnInit(): void {
  }

  goToLink(){
    //console.log(this.pdf);
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
    window.open(this.urlPDF, "_blank");
  }

  copytext(key: HTMLParagraphElement, buttonkey: HTMLButtonElement){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    if (typeof key.textContent === 'string') {
      selBox.value = key.textContent.toString().split(": ")[1];
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }

    buttonkey.disabled = true;
    buttonkey.textContent = 'Copiado';
    buttonkey.style.background = '#4d5753';
    setTimeout(() => {
      buttonkey.disabled = false;
      buttonkey.textContent = this.buttonCopy;
      buttonkey.removeAttribute('style');
    }, 3000);

  }

}
