import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyListComponent } from './company-list.component';
import { CompanyService } from '../../services/company.service';
import { of } from 'rxjs';
import { Company } from '../../models/company';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CompanyListComponent', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;
  let companyServiceSpy: jasmine.SpyObj<CompanyService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;

  const mockCompanies: Company[] = [
    { id: '1', name: 'Company One', ticker: 'COM1', exchange: 'NYSE', isin: 'US1234567890', website: 'http://companyone.com' },
    { id: '2', name: 'Company Two', ticker: 'COM2', exchange: 'NASDAQ', isin: 'US0987654321', website: 'http://companytwo.com' }
  ];

  beforeEach(async () => {
    companyServiceSpy = jasmine.createSpyObj('CompanyService', ['getCompanies']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    companyServiceSpy.getCompanies.and.returnValue(of(mockCompanies));

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatDialogModule,
        NoopAnimationsModule,
        CompanyListComponent
      ],
      providers: [
        { provide: CompanyService, useValue: companyServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load companies on init', () => {
    companyServiceSpy.getCompanies.and.returnValue(of(mockCompanies));
    component.ngOnInit();
    fixture.detectChanges();

    expect(companyServiceSpy.getCompanies).toHaveBeenCalled();
    expect(component.datasource.data).toEqual(mockCompanies);
  });

  it('should open the dialog with company data when openDialog is called with a company', () => {
    const mockCompany = mockCompanies[0];
    dialogSpy.open.and.returnValue(dialogRefSpy);
    dialogRefSpy.afterClosed.and.returnValue(of('complete'));

    component.openDialog(mockCompany);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      {
        height: '400px',
        width: '600px',
        data: {
          ...mockCompany,
          edit: true
        }
      }
    );
  });

  it('should open the dialog without company data when openDialog is called without a company', () => {
    dialogSpy.open.and.returnValue(dialogRefSpy);
    dialogRefSpy.afterClosed.and.returnValue(of('complete'));

    component.openDialog();
    expect(dialogSpy.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      {
        height: '400px',
        width: '600px',
        data: {
          edit: false
        }
      }
    );
  });

  it('should reload data after dialog is closed with "complete"', () => {
    companyServiceSpy.getCompanies.and.returnValue(of(mockCompanies));
    dialogSpy.open.and.returnValue(dialogRefSpy);
    dialogRefSpy.afterClosed.and.returnValue(of('complete'));

    component.openDialog();
    expect(companyServiceSpy.getCompanies).toHaveBeenCalled();
  });

  it('should not reload data after dialog is closed with any result other than "complete"', () => {
    companyServiceSpy.getCompanies.calls.reset();
    dialogSpy.open.and.returnValue(dialogRefSpy);
    dialogRefSpy.afterClosed.and.returnValue(of('cancelled'));

    component.openDialog();
    expect(companyServiceSpy.getCompanies).not.toHaveBeenCalled();
  });
});
