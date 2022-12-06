import { PartnersService } from './../../../core/partners/partners.service';
import { ServicesService } from './../../../core/services/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private service: ServicesService,
    private partners: PartnersService
  ) { }

  hasChange: boolean;
  visible: boolean = true;
  changeType: boolean = true;
  identification: string = '';

  //newPass: string = "";
  //repeatPass: string = "";
  passwords = {}
  passForm: FormGroup = this.formBuilder.group({
    password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  },
  // {
  //   validator: this.checkMatchValidator('password1', 'password2')
  // }
  );

  ngOnInit(): void {
    this.service.verifyToken().subscribe(
      res => {
        //console.log(res.identification);
        this.identification = res.identification;
      }
    );
  }

  changePass(){
    this.passForm.markAllAsTouched();
    if(!this.passForm.valid){
      return;
    }

    let pass1 = this.passForm.value.password1;
    let pass2 = this.passForm.value.password2;
    if(pass1!==pass2){
      return;
    }

    let user = {
      identification: this.identification,
      password: pass1,
    };

    this.partners.changepass(user).subscribe(
      res => {
        console.log(res);
      }
    );

    this.hasChange = false;//////change password backend
  }

  checkMatchValidator(field1: string, field2: string) {
    return function (frm:any) {
      let field1Value = frm.get(field1).value;
      let field2Value = frm.get(field2).value;

      if (field1Value !== '' && field1Value !== field2Value) {
        return { 'notMatch': `value ${field1Value} is not equal to ${field2}` }
      }
      return null;
    }
  }

  validateMatch(pass1: string, pass2: string): boolean | null{
    var value1 = this.passForm.controls[pass1].value;
    var value2 = this.passForm.controls[pass2].value;
    var value = (value1 != value2) ? true : false
    return value
  }

  validatePass(campo: string){
    return this.passForm.controls[campo].errors && this.passForm.controls[campo].touched;
  }

  viewPass(){
    this.visible = !this.visible;
    this.changeType = !this.changeType;
    return;
  }

  getHasChange(){
    return !this.hasChange;
  }

}
