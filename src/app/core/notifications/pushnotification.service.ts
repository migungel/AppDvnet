import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {

  constructor(
    private http: HttpClient
  ) { }

  url: string = environment.PUSH_URL;

  saveToken(token: any){
    return this.http.post(`${this.url}/save`, token);
  }

}
