import { EncryptService } from './../storage/encrypt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private http: HttpClient,
    private storage: EncryptService,
  ) { }

  url: string = environment.WS_URL;

  verifyToken(){
    return this.http.get<any>(`${this.url}/verifyToken`);
  }

  getPartner(user: any){
    return this.http.post<any>(`${this.url}/getPartner`, user);
  }

  getData(user: any){
    return this.http.post<any>(`${this.url}/getData`, user);
  }

  getProducts(agreement: string){
    return this.http.get<any>(`${this.url}/getProducts/${agreement}`);
  }

  getInvoice(year: string, user: any){
    return this.http.post<any>(`${this.url}/getInvoices/${year}`, user);
  }

  getOrders(agreement_id: string){
    return this.http.get<any>(`${this.url}/getOrders/${agreement_id}`);
  }

  getAllProducts(){
    return this.http.get<any>(`${this.url}/getAllProducts`);
  }

  getMotives(){
    return this.http.get<any>(`${this.url}/getMotives`);
  }

}
