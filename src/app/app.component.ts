import { PushnotificationService } from './core/notifications/pushnotification.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appDvnet';
  showHeader = false;

  readonly VAPID_PUBLIC_KEY = 'BAz38Z1heVk_IXa3ZaAqs-hC9vYUbN8IyiicO8VWgOcldtNEe9KxeGwx9i-WnZVQladBOYOzCTDlepYASeTX8dg';

  constructor(
    private router: Router,
    private swPush: SwPush,
    private notification: PushnotificationService
  ) {
    this.subscribeNotification();
    this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
    ).subscribe(event => this.modifyHeader(event));
  }

  subscribeNotification(){
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(
      res => {
        //console.log(res)
        const token = JSON.parse(JSON.stringify(res));
        console.log(token)
        this.notification.saveToken(token).subscribe(
          res => {
            //console.log(res);
          },
          err => {
            console.error(err.error['message']);
          }
        );
      }
    ).catch(
      err => {
        console.log(err)
      }
    );
  }

  modifyHeader(location: any) {
    if (location.url === '/auth/login' || location.url === '/' || location.url === '/auth/register') {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }
}
