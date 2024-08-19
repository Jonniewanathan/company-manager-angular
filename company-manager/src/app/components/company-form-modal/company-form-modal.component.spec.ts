import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CompanyFormModalComponent} from './company-form-modal.component';
import {CompanyFormComponent} from '../company-form/company-form.component';
import {MatDialogContent, MatDialogClose, MatDialogActions, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormDialogData} from '../../models/formDialogData';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Company} from '../../models/company';
import {MockComponent} from 'ng-mocks';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatButton
  ],
  template: 'test'
})
class CompanyFormComponentMock {
  @Input() company: Company = {} as Company;
  @Input() editMode: boolean = false;
  @Input() readonly : boolean = false;
  @Output() afterSubmit = new EventEmitter();
}

describe('CompanyFormModalComponent', () => {
  let component: CompanyFormModalComponent;
  let fixture: ComponentFixture<CompanyFormModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CompanyFormModalComponent>>;
  const mockDialogData: FormDialogData = {
    id: '1',
    name: 'Test Company',
    isin: 'US1234567890',
    ticker: 'ABC',
    exchange: 'ABC',
    website: 'www.google.com',
    edit: false
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogContent,
        CompanyFormModalComponent,
        MockComponent(CompanyFormComponent),
        MatDialogClose,
        MatButton,
        MatDialogActions,
        MatDialogTitle,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRefSpy},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have injected data from MAT_DIALOG_DATA', () => {
    expect(component.formDialogData).toEqual(mockDialogData);
  });

  it('should close the dialog with "complete" when close() is called', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalledWith('complete');
  });
});
