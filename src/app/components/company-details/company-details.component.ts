import {Component, Input, OnInit} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../models/company';
import {CompanyFormComponent} from '../company-form/company-form.component';
import {Location} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [
    CompanyFormComponent,
    MatButton
  ],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent implements OnInit{
  @Input() id?: string;
  @Input() isin?: string;
  showForm: boolean = false;
  constructor(private companyService: CompanyService, private location: Location) {
  }

  company: Company = {} as Company;

  ngOnInit(): void {
    if (this.id) {
      this.companyService.getCompanyById(this.id).subscribe(
          (x: Company) => {
            this.company = x
            this.showForm = true;
          }
      )
    }
    if (this.isin) {
      this.companyService.getCompanyByIsin(this.isin).subscribe(
        (x: Company) => {
          this.company = x
          this.showForm = true;
        }
      )
    }
  }

  goBack(){
    this.location.back();
  }

}
