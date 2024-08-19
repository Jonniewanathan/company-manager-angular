import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CompanyService} from '../../services/company.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-search',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatButton
  ],
  templateUrl: './company-search.component.html',
  styleUrl: './company-search.component.scss'
})
export class CompanySearchComponent implements OnInit {
  companyService = inject(CompanyService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  companySearchForm!: FormGroup;


  ngOnInit(): void {
    this.companySearchForm = this.formBuilder.group({
      id: [''],
      isin: ['', Validators.pattern('^[A-Z]{2}[A-Z0-9]{10}$')]
    });
  }

  onSubmit(): void {
    if (this.companySearchForm.valid) {
      if (this.companySearchForm.value.id) {
        this.router.navigate([`/company/id/${this.companySearchForm.value.id}`])
      }
      if (this.companySearchForm.value.isin){
        this.router.navigate([`/company/isin/${this.companySearchForm.value.isin}`])
      }
    }
  }

  disableFields() {
    if (this.companySearchForm.value.id) {
      this.companySearchForm.controls['isin'].disable();
    }
    if (this.companySearchForm.value.isin) {
      this.companySearchForm.controls['id'].disable();
    }
    if (!this.companySearchForm.value.isin && !this.companySearchForm.value.id) {
      this.companySearchForm.controls['id'].enable();
      this.companySearchForm.controls['isin'].enable();
    }
  }
}
