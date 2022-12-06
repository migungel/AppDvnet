import { GuardsGuard } from './../../core/guards/guards.guard';
import { RegisterComponent } from './register/register.component';
import { CheckpassGuard } from './../../core/guards/changepass/checkpass.guard';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'password',
    component: ChangePassComponent,
    canDeactivate: [CheckpassGuard],
    canActivate: [GuardsGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
