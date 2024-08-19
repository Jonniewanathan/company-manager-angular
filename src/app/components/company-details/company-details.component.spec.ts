import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CompanyDetailsComponent } from './company-details.component';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { CompanyFormComponent } from '../company-form/company-form.component';

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;
  let companyServiceMock: jasmine.SpyObj<CompanyService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CompanyService', ['getCompanyById', 'getCompanyByIsin']);

    await TestBed.configureTestingModule({
      imports: [CompanyDetailsComponent, CompanyFormComponent],
      providers: [
        { provide: CompanyService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;
    companyServiceMock = TestBed.inject(CompanyService) as jasmine.SpyObj<CompanyService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve a company by ID and display the form', () => {
    const dummyCompany: Company = {
      id: '1',
      name: 'Company A',
      isin: 'US1234567890',
      ticker: 'abc',
      exchange: 'ABC',
      website: 'www.example.com'
    };
    companyServiceMock.getCompanyById.and.returnValue(of(dummyCompany));

    component.id = '1';
    component.ngOnInit();

    expect(companyServiceMock.getCompanyById).toHaveBeenCalledWith('1');
    expect(component.company).toEqual(dummyCompany);
    expect(component.showForm).toBeTrue();
  });

  it('should retrieve a company by ISIN and display the form', () => {
    const dummyCompany: Company = {
      id: '2',
      name: 'Company B',
      isin: 'US0987654321',
      ticker: 'abc',
      exchange: 'ABC',
      website: 'www.example.com'
    };
    companyServiceMock.getCompanyByIsin.and.returnValue(of(dummyCompany));

    component.isin = 'US0987654321';
    component.ngOnInit();

    expect(companyServiceMock.getCompanyByIsin).toHaveBeenCalledWith('US0987654321');
    expect(component.company).toEqual(dummyCompany);
    expect(component.showForm).toBeTrue();
  });

  it('should not retrieve a company or display the form if no ID or ISIN is provided', () => {
    component.ngOnInit();

    expect(companyServiceMock.getCompanyById).not.toHaveBeenCalled();
    expect(companyServiceMock.getCompanyByIsin).not.toHaveBeenCalled();
    expect(component.showForm).toBeFalse();
  });
});
