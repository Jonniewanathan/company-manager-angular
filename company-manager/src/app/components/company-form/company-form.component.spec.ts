import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyFormComponent } from './company-form.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { of } from 'rxjs';
import { Company } from '../../models/company';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CompanyFormComponent', () => {
  let component: CompanyFormComponent;
  let fixture: ComponentFixture<CompanyFormComponent>;
  let companyServiceSpy: jasmine.SpyObj<CompanyService>;

  const mockCompany: Company = {
    id: '1',
    name: 'Test Company',
    ticker: 'TC',
    exchange: 'NYSE',
    isin: 'US1234567890',
    website: 'http://testcompany.com'
  };

  beforeEach(async () => {
    companyServiceSpy = jasmine.createSpyObj('CompanyService', ['updateCompany', 'createCompany']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CompanyFormComponent, BrowserAnimationsModule],
      providers: [
        { provide: CompanyService, useValue: companyServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values in non-edit mode', () => {
    component.editMode = false;
    component.ngOnInit();
    expect(component.companyForm.value).toEqual({
      name: '',
      ticker: '',
      exchange: '',
      isin: '',
      website: ''
    });
  });

  it('should initialize the form with company values in edit mode', () => {
    component.editMode = true;
    component.company = mockCompany;
    component.ngOnInit();
    expect(component.companyForm.value).toEqual({
      name: mockCompany.name,
      ticker: mockCompany.ticker,
      exchange: mockCompany.exchange,
      isin: mockCompany.isin,
      website: mockCompany.website
    });
  });

  it('should disable the form when readonly is true', () => {
    component.readonly = true;
    component.company = mockCompany;
    component.ngOnInit();
    expect(component.companyForm.disabled).toBeTrue();
  });

  it('should call createCompany on submit if not in edit mode', () => {
    component.editMode = false;
    component.companyForm.setValue({
      name: mockCompany.name,
      ticker: mockCompany.ticker,
      exchange: mockCompany.exchange,
      isin: mockCompany.isin,
      website: mockCompany.website
    });
    companyServiceSpy.createCompany.and.returnValue(of({}));
    spyOn(component.afterSubmit, 'emit');

    component.onSubmit();

    expect(companyServiceSpy.createCompany).toHaveBeenCalledWith(component.companyForm.value);
    expect(component.afterSubmit.emit).toHaveBeenCalled();
  });

  it('should call updateCompany on submit if in edit mode', () => {
    component.editMode = true;
    component.company = mockCompany;
    component.companyForm.setValue({
      name: mockCompany.name,
      ticker: mockCompany.ticker,
      exchange: mockCompany.exchange,
      isin: mockCompany.isin,
      website: mockCompany.website
    });
    companyServiceSpy.updateCompany.and.returnValue(of({}));
    spyOn(component.afterSubmit, 'emit');

    component.onSubmit();

    expect(companyServiceSpy.updateCompany).toHaveBeenCalledWith(mockCompany.id, component.companyForm.value);
    expect(component.afterSubmit.emit).toHaveBeenCalled();
  });

  it('should not call create or update if the form is invalid', () => {
    component.companyForm.setValue({
      name: '',
      ticker: '',
      exchange: '',
      isin: '',
      website: ''
    });
    component.onSubmit();

    expect(companyServiceSpy.createCompany).not.toHaveBeenCalled();
    expect(companyServiceSpy.updateCompany).not.toHaveBeenCalled();
  });
});
