import { ChangePassComponent } from './../../../modules/authentication/change-pass/change-pass.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckpassGuard implements CanDeactivate<unknown> {

  canDeactivate(
    component: ChangePassComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (component.getHasChange()) {
        return true;
      }else {
        return confirm('¿Desea abandonar esta página sin guardar los cambios?');
      }
  }
  
}
