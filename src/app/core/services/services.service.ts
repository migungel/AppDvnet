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
  url_client: string = environment.WS_CLIENT_URL;
  database: string = environment.DATABASE_NAME;

  getData(identifiaction: string){
    let body = new URLSearchParams();
    body.set('dbname', this.database);
    body.set('user', this.storage.getDataJson('credentials')['user']);
    body.set('pass', this.storage.getDataJson('credentials')['pass']);
    body.set('identification_id', identifiaction);
    return this.http.post(`${this.url_client}/GetData`, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      responseType: 'text'
    });
  }

}
