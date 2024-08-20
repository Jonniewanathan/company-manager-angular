import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CompanyService } from './company.service';
import { Company } from '../models/company';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/companies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });

    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve companies from the API via GET', () => {
    const dummyCompanies: Company[] = [
      { id: '1', name: 'Company A', isin: 'US1234567890', website: 'www.google.com', ticker: 'abc', exchange: 'exchange'},
      { id: '2', name: 'Company B', isin: 'US1234567890', website: 'www.google.com', ticker: 'abc', exchange: 'exchange'},
    ];

    service.getCompanies().subscribe(companies => {
      expect(companies.length).toBe(2);
      expect(companies).toEqual(dummyCompanies);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCompanies);
  });

  it('should create a new company via POST', () => {
    const newCompany = { name: 'Company C', isin: 'US1112223334' };

    service.createCompany(newCompany).subscribe(response => {
      expect(response).toEqual(newCompany);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newCompany);
  });

  it('should retrieve a company by ID via GET', () => {
    const dummyCompany = { id: '1', name: 'Company A', isin: 'US1234567890' };
    const companyId = '1';

    service.getCompanyById(companyId).subscribe(company => {
      expect(company).toEqual(dummyCompany);
    });

    const req = httpMock.expectOne(`${apiUrl}/${companyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCompany);
  });

  it('should update a company via PUT', () => {
    const updatedCompany = { id: '1', name: 'Updated Company', isin: 'US1234567890' };
    const companyId = '1';

    service.updateCompany(companyId, updatedCompany).subscribe(response => {
      expect(response).toEqual(updatedCompany);
    });

    const req = httpMock.expectOne(`${apiUrl}/${companyId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCompany);
  });

  it('should retrieve a company by ISIN via GET', () => {
    const dummyCompany = { id: '1', name: 'Company A', isin: 'US1234567890' };
    const isin = 'US1234567890';

    service.getCompanyByIsin(isin).subscribe(company => {
      expect(company).toEqual(dummyCompany);
    });

    const req = httpMock.expectOne(`${apiUrl}/isin/${isin}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCompany);
  });
});
