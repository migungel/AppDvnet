import { LoginComponent } from './modules/authentication/login/login.component';
import { GuardsGuard } from './core/guards/guards.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m=>m.AuthenticationModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m=>m.HomeModule),
    canActivate: [GuardsGuard],
  },
  //{
  //  path: '',
  //  redirectTo: 'auth',
  //  pathMatch: 'full'
  //}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
