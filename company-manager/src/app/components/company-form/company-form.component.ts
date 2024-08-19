import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Company} from '../../models/company';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatButton
  ],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent implements OnInit {
  companyForm!: FormGroup;
  @Input() company: Company = {} as Company;
  @Input() editMode: boolean = false;
  @Input() readonly : boolean = false;
  @Output() afterSubmit = new EventEmitter();

  constructor(private fb: FormBuilder, private companyService: CompanyService) {}

  ngOnInit(): void {
    if (this.editMode){
      this.companyForm = this.fb.group({
        name: [this.company.name, Validators.required],
        ticker: [this.company.ticker, Validators.required],
        exchange: [this.company.exchange, Validators.required],
        isin: [this.company.isin, [Validators.required, Validators.pattern('^[A-Z]{2}[A-Z0-9]{10}$')]],
        website: [this.company.website]
      });
    } else {
      this.companyForm = this.fb.group({
        name: ['', Validators.required],
        ticker: ['', Validators.required],
        exchange: ['', Validators.required],
        isin: ['', [Validators.required, Validators.pattern('^[A-Z]{2}[A-Z0-9]{10}$')]],
        website: ['']
      });
    }
    if (this.readonly) {
      this.companyForm = this.fb.group({
        name: [this.company.name, Validators.required],
        ticker: [this.company.ticker, Validators.required],
        exchange: [this.company.exchange, Validators.required],
        isin: [this.company.isin, [Validators.required, Validators.pattern('^[A-Z]{2}[A-Z0-9]{10}$')]],
        website: [this.company.website]
      });
      this.companyForm.disable();
    }
  }

  onSubmit(): void {
    // ADD check here if successfully Created/Updated
    if (this.companyForm.valid) {
      if (this.editMode){
        this.companyService.updateCompany(this.company.id, this.companyForm.value).subscribe();
      } else {
        this.companyService.createCompany(this.companyForm.value).subscribe();
      }

      this.afterSubmit.emit();
    }
  }
}
