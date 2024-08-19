import { Routes } from '@angular/router';
import {CompanyContainerComponent} from './components/company-container/company-container.component';
import {CompanyDetailsComponent} from './components/company-details/company-details.component';

export const routes: Routes = [
  { path: '', component: CompanyContainerComponent },
  { path: 'company/id/:id', component: CompanyDetailsComponent },
  { path: 'company/isin/:isin', component: CompanyDetailsComponent }
];
