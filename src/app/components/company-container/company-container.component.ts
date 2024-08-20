import {Component, inject} from '@angular/core';
import {CompanyListComponent} from '../company-list/company-list.component';
import {CompanySearchComponent} from '../company-search/company-search.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-company-container',
  standalone: true,
  imports: [
    CompanyListComponent,
    CompanySearchComponent,
    MatButton
  ],
  templateUrl: './company-container.component.html',
  styleUrl: './company-container.component.scss'
})
export class CompanyContainerComponent {
  auth = inject(AuthService);
  router = inject(Router);

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}


