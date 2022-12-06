import { ServicesService } from './../../../core/services/services.service';
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
    private service: ServicesService
  ) { }

  name: string = '';
  identification: string = '';
  email: string = '';
  sign: string | ArrayBuffer | null;
  image: SafeResourceUrl;

  ngOnInit(): void {
    this.dataUser();
  }

  dataUser(){
    this.service.verifyToken().subscribe(
      res => {
        this.loadData(res);
      }
    );
  }

  loadData(data: any){
    this.service.getPartner(data).subscribe(
      res => {
        this.name = res.name;
        this.identification = res.identification_id;
        this.email = res.email;
      }
    );
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  changePass(){
    //this.sign = this.storage.getDataJson('currentUser')['sign'];
    //this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.sign);
    //window.open(fileURL);
    this.router.navigateByUrl('auth/password');
  }

  cerrar(){
    this.login.logout();
    this.router.navigateByUrl('');
  }

}
