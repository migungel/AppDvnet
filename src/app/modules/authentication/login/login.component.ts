import { EncryptService } from '../../../core/storage/encrypt.service';
import { LoginService } from './../../../core/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// declare global {
//   var parseXml:(xmlStr:string)=>{}
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginserv: LoginService,
    private storage: EncryptService,
  ) { }

  identification: string = "";
  password: string = "";
  loginForm: FormGroup = this.formBuilder.group({
    identification: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(14)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
  });

  user = { };
  error: boolean = false;
  alerta = '';
  visible: boolean = true;
  changeType: boolean = true;

  ngOnInit(): void {
  }

  autenticar(){
    this.loginForm.markAllAsTouched();
    if(!this.loginForm.valid){
      return;
    }

    this.user = {
      identification: this.loginForm.value.identification,
      password: this.loginForm.value.password,
    };

    this.loginserv.login(this.user).subscribe(
      res => {
        if ( res ) {
          this.storage.saveData('token', res.toString());
          this.router.navigateByUrl('/home');
        } else {
          this.errorMsg('');
        }
      },
      err => {
        this.errorMsg(err.error['message']);
      }
    );
  }

  register(){
    this.router.navigateByUrl('/auth/register');
  }

  viewPass(){
    this.visible = !this.visible;
    this.changeType = !this.changeType;
    return;
  }

  errorMsg(msg: string){
    this.error = true;
    this.alerta = msg;
  }

  validarCampos(campo: string): boolean | null{
    return this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched;
  }

  closeAlert(){ this.error = false}

}
