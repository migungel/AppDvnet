import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(
    private http: HttpClient,
  ) { }

  url: string = environment.WS_URL;

  registerPartner(partner: any){
    return this.http.post(`${this.url}/partner`, partner);
  }

  changepass(partner: any){
    return this.http.put(`${this.url}/changepass`, partner);
  }
}
