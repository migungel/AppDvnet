import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate, CanLoad {

  constructor(
    private login: LoginService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.login.isLogueado()) {
        return true;
      }
      this.router.navigateByUrl('auth/login');
      return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.login.isLogueado()) {
        return true;
      }
      this.router.navigateByUrl('auth/login');
      return false;
  }
}
