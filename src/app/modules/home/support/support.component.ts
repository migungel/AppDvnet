import { ServicesService } from './../../../core/services/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private service: ServicesService,
  ) { }

  form: FormGroup;
  motives: Array<any> = [];

  ngOnInit(): void {
    this.setForm();
    this.setMotives();
  }

  setForm(){
    this.form = this.formBuilder.group({
      motive: ['', [Validators.required]],
      detail: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  setMotives(){
    this.service.getMotives().subscribe(
      res => {
        this.motives = res;
      }
    );
  }

  send(){
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
  }

  validarCampos(campo: string): boolean | null{
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

}
