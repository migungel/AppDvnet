import { Body } from './../../interfaces/body';
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

  isLogueado(){
    return !!sessionStorage.getItem('token');
  }

  login(user: any) {
    return this.http.post(`${this.url}/login`, user);
  }

  verifyId(identification: string){
    return this.http.get(`${this.url}/verifyId/${identification}`)
  }

  //getDataByKey(credential: string){
  //  return JSON.parse(this.storage.getData(credential));
  //}

  logout(){
    this.storage.removeData('token');
    this.storage.clearData();
    this.router.navigateByUrl('login');
  }

}
