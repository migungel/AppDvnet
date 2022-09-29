import { filter } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(event => this.modifyHeader(event));
  }

  selected = this.router.url;

  modifyHeader(location: any) {
    this.selected = location.url;
    // if (location.url === '/login' || location.url === '/' || location.url === '/auth/login') {
    //   this.selected = false;
    // } else {
    //   this.selected = true;
    // }
  }

  ngOnInit(): void {
  }

  cerrar(){
    //console.log("Sesion cerrada")
    //this.authServ.logout();
    this.router.navigateByUrl('');
  }

}
