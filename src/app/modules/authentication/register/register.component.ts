import { PartnersService } from './../../../core/partners/partners.service';
import { ServicesService } from './../../../core/services/services.service';
import { LoginService } from './../../../core/login/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private login: LoginService,
    private services: ServicesService,
    private partners: PartnersService,
  ) { }

  registerForm: FormGroup = this.formBuilder.group({
    identification: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeatpassword: ['', [Validators.required, Validators.minLength(8)]]
  },
  {
    validator: this.MatchConfirom('password','repeatpassword'),
  }
  )
  error: boolean = false;
  alerta = '';
  changeType: boolean = true;
  visible: boolean = true;
  client: boolean = false;
  show: boolean = false;

  ngOnInit(): void {
  }

  register(){
    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid) {
      return;
    }

    let partner = {
      identification: this.registerForm.value.identification,
      password: this.registerForm.value.password
    }
    this.check('identification');
    if (this.client){
      this.partners.registerPartner(partner).subscribe(
        res => {
          this.showMsg('Usuario resgistrado con exito');
          this.registerForm.reset();
          this.client = false;
        },
        err => {
          this.errorMsg(err.error['message']);
        }
      );
    }
  }

  check(identification: string){
    this.error = false
    this.registerForm.controls[identification].markAsTouched();
    if(this.registerForm.controls[identification].errors){
      return;
    }
    this.login.verifyId(this.registerForm.value.identification).subscribe(
      res => {
        if (res) {
          this.client = true;
        } else {
          this.client = false;
          this.errorMsg();
        }
      }
    );
  }

  back(){
    this.router.navigateByUrl('/');
  }

  validarCampos(campo: string): boolean | null{
    return this.registerForm.controls[campo].errors && this.registerForm.controls[campo].touched;
  }

  MatchConfirom(type1: any, type2: any) {
    return (checkForm: FormGroup) => {
      let value1 = checkForm.controls[type1];
      let value2 = checkForm.controls[type2];
      if (value1.value === value2.value ) {
        return value2.setErrors(null);
      } else {
        return value2.setErrors({ notEquivalent: true });
      }
    };
  }

  viewPass(){
    this.visible = !this.visible;
    this.changeType = !this.changeType;
    return;
  }

  showMsg(msg: string){
    this.show = true;
    this.alerta = msg;
  }

  errorMsg(msg?: string){
    this.error = true;
    this.show = true;
    this.alerta = msg || 'No existe un cliente con esa identificación';
  }

  closeAlert(){ this.error = false; this.show = false}

}
