import { Router } from '@angular/router';
import { EncryptService } from '../../core/storage/encrypt.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private storage: EncryptService,
    private router: Router,
  ) { }

  url: string = environment.WS_URL;
  database: string = environment.DATABASE_NAME;

  isLogueado(){
    return !!sessionStorage.getItem('credentials');
  }

  login(user: any) {
    let body = new URLSearchParams();
    body.set('dbname', this.database);
    body.set('user', user.user);
    body.set('pass', user.pass);
    //console.log(body.toString());
    //const jsonData = JSON.stringify(user);
    this.storage.saveDataJson('credentials', user);
    return this.http.post(`${this.url}/GetLogin`, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      responseType: 'text'
    });
  }

  getDataByKey(credential: string){
    return JSON.parse(this.storage.getData(credential));
  }

  logout(){
    this.storage.removeData('credentials');
    this.storage.clearData();
    this.router.navigateByUrl('login');
  }

}
