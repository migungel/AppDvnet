import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appDvnet';
  showHeader = false;

  constructor(
    private router: Router
  ) {
    this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
    ).subscribe(event => this.modifyHeader(event));
  }

  modifyHeader(location: any) {
    if (location.url === '/login' || location.url === '/' || location.url === '/auth/login') {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }
}
