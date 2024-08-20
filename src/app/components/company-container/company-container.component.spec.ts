import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyContainerComponent } from './company-container.component';
import { CompanyListComponent } from '../company-list/company-list.component';
import { CompanySearchComponent } from '../company-search/company-search.component';
import {MockComponent} from 'ng-mocks';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

describe('CompanyContainerComponent', () => {
  let component: CompanyContainerComponent;
  let fixture: ComponentFixture<CompanyContainerComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'saveToken']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        CompanyContainerComponent,
        MockComponent(CompanyListComponent),
        MockComponent(CompanySearchComponent)
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain CompanyListComponent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-company-list')).toBeTruthy();
  });

  it('should contain CompanySearchComponent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-company-search')).toBeTruthy();
  });
});
