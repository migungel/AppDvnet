import { SpinnerService } from './../../core/spinner/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  constructor(
    private spinnerServ: SpinnerService
  ) { }

  isLoading$ = this.spinnerServ.isLoading$;

}
