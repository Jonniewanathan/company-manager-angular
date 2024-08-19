import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanySearchComponent } from './company-search.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CompanySearchComponent', () => {
  let component: CompanySearchComponent;
  let fixture: ComponentFixture<CompanySearchComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const companyServiceMock = jasmine.createSpyObj('CompanyService', ['getCompanies']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CompanySearchComponent, BrowserAnimationsModule ],
      providers: [
        { provide: CompanyService, useValue: companyServiceMock },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct default values', () => {
    const form = component.companySearchForm;
    expect(form).toBeDefined();
    expect(form.get('id')?.value).toBe('');
    expect(form.get('isin')?.value).toBe('');
    expect(form.get('isin')?.validator).toBeTruthy();
  });

  it('should navigate to company by ID when form is valid and ID is provided', () => {
    component.companySearchForm.setValue({ id: '123', isin: '' });
    component.onSubmit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/company/id/123']);
  });

  it('should navigate to company by ISIN when form is valid and ISIN is provided', () => {
    component.companySearchForm.setValue({ id: '', isin: 'US1234567890' });
    component.onSubmit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/company/isin/US1234567890']);
  });

  it('should not navigate if the form is invalid', () => {
    component.companySearchForm.setValue({ id: '', isin: 'INVALID_ISIN' });
    component.onSubmit();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should disable ISIN field when ID is entered', () => {
    component.companySearchForm.setValue({ id: '123', isin: '' });
    component.disableFields();
    expect(component.companySearchForm.get('isin')?.disabled).toBeTrue();
  });

  it('should disable ID field when ISIN is entered', () => {
    component.companySearchForm.setValue({ id: '', isin: 'US1234567890' });
    component.disableFields();
    expect(component.companySearchForm.get('id')?.disabled).toBeTrue();
  });

  it('should enable both fields when neither ID nor ISIN is entered', () => {
    component.companySearchForm.setValue({ id: '', isin: '' });
    component.disableFields();
    expect(component.companySearchForm.get('id')?.enabled).toBeTrue();
    expect(component.companySearchForm.get('isin')?.enabled).toBeTrue();
  });
});
