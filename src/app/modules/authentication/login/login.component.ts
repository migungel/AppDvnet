import { EncryptService } from '../../../core/storage/encrypt.service';
import { LoginService } from './../../../core/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare global {
  var parseXml:(xmlStr:string)=>{}
}

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

  usuario: string = "";
  password: string = "";
  loginForm: FormGroup = this.formBuilder.group({
    usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
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
      //user: 'admin',
      //pass: 'DvtvCanal9',
      user: this.loginForm.value.usuario,
      pass: this.loginForm.value.password,
    };

    this.loginserv.login(this.user).subscribe(
      res => {
        const myXML = new DOMParser().parseFromString(res, 'text/xml');
        const currentUser = {
          name: myXML.getElementsByTagName('Name')[0].textContent,
          user_id: myXML.getElementsByTagName('User_id')[0].textContent,
          identification: myXML.getElementsByTagName('Identificacion')[0].textContent,
          sign: myXML.getElementsByTagName('Firma')[0].textContent,
        };
        //console.log(Name);
        this.storage.saveDataJson('currentUser', currentUser);
        //console.log(User.children);
        //console.log(this.storage.getDataJson('credentials'));
        //console.log(this.storage.getDataJson('currentUser'));

        this.router.navigateByUrl('/home');
      },
      err => {
        //console.log(err);
        this.error = true;
        this.alerta = 'Usuario o clave incorrecto';
      }
    );

    //this.router.navigateByUrl('/home');

    //this.authServ.inicioSesion(this.user).subscribe(
    //  res => {
    //    if (this.authServ.isLogueado()){
    //      this.router.navigateByUrl('/home');
    //    }else{
    //      this.router.navigateByUrl('/login');
    //    }
    //  },
    //  err => {
    //    //console.log(err);
    //    this.error = true;
    //    this.alerta = 'Usuario o clave incorrecto';
    //  }
    //);
  }

  viewPass(){
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  validarCampos(campo: string): boolean | null{
    return this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched;
  }

  closeAlert(){ this.error = false}

}
