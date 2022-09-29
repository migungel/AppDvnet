import { Router } from '@angular/router';
import { LoginService } from './../../../core/login/login.service';
import { EncryptService } from './../../../core/storage/encrypt.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private storage: EncryptService,
    private login: LoginService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  name: string = '';
  identification: string = '';
  sign: string | ArrayBuffer | null;
  image: SafeResourceUrl;

  ngOnInit(): void {
    this.dataUser();
  }

  dataUser(){
    this.name = this.storage.getDataJson('currentUser')['name'];
    this.identification = this.storage.getDataJson('currentUser')['identification'];
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  changePass(){
    this.sign = this.storage.getDataJson('currentUser')['sign'];
    //console.log(this.sign);
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.sign);
    //window.open(fileURL);
  }

  cerrar(){
    this.login.logout();
    this.router.navigateByUrl('');
  }

}
