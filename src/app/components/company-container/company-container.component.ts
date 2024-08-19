import {Component} from '@angular/core';
import {CompanyListComponent} from '../company-list/company-list.component';
import {CompanySearchComponent} from '../company-search/company-search.component';

@Component({
  selector: 'app-company-container',
  standalone: true,
  imports: [
    CompanyListComponent,
    CompanySearchComponent
  ],
  templateUrl: './company-container.component.html',
  styleUrl: './company-container.component.scss'
})
export class CompanyContainerComponent {}
