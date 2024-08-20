import { Routes } from '@angular/router';
import {CompanyContainerComponent} from './components/company-container/company-container.component';
import {CompanyDetailsComponent} from './components/company-details/company-details.component';
import {canActivate} from './gaurds/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: CompanyContainerComponent,
    canActivate: [canActivate]
  },
  {
    path: 'company/id/:id',
    component: CompanyDetailsComponent,
    canActivate: [canActivate]
  },
  {
    path: 'company/isin/:isin',
    component: CompanyDetailsComponent,
    canActivate: [canActivate]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
