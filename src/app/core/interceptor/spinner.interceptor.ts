import { EncryptService } from './../storage/encrypt.service';
import { SpinnerService } from './../spinner/spinner.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private spinnerServ: SpinnerService,
    private storage: EncryptService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerServ.show();
    request = request.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${this.storage.getToken('token')}`,
      },
    });
    return next.handle(request).pipe(
      finalize(() => this.spinnerServ.hide())
    );
  }
}
