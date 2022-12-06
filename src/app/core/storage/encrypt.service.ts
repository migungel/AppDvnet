import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  key = "appDvnet";

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

  public saveData(key: string, value: string) {
    sessionStorage.setItem(key, this.encrypt(value));
  }

  saveDataJson(key: string, value: any) {
    const jsonData = JSON.stringify(value);
    sessionStorage.setItem(key, this.encrypt(jsonData));
  }

  getToken(key: string){
    //return sessionStorage.getItem(key);
    let token = sessionStorage.getItem(key)|| "";
    return this.decrypt(token);
  }

  public getData(key: string) {
    let data = sessionStorage.getItem(key)|| "";
    return this.decrypt(data);
  }

  public getDataJson(key: string) {
    let data = sessionStorage.getItem(key)|| "";
    return JSON.parse(this.decrypt(data));
    //return this.decrypt(data);
  }

  public removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }

}
