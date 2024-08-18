import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Company} from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000/api/companies';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  createCompany(company: any): Observable<any> {
    return this.http.post(this.apiUrl, company);
  }

  getCompanyById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateCompany(id: string, company: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, company);
  }

  getCompanyByIsin(isin: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/isin/${isin}`);
  }
}
