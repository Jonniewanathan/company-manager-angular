import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {CompanyFormComponent} from '../company-form/company-form.component';
import {MatButton} from '@angular/material/button';
import {FormDialogData} from '../../models/formDialogData';

@Component({
  selector: 'app-company-form-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    CompanyFormComponent,
    MatDialogClose,
    MatButton,
    MatDialogActions,
    MatDialogTitle
  ],
  templateUrl: './company-form-modal.component.html',
  styleUrl: './company-form-modal.component.scss'
})
export class CompanyFormModalComponent {

  readonly dialogRef = inject(MatDialogRef<CompanyFormModalComponent>);
  readonly data = inject<FormDialogData>(MAT_DIALOG_DATA);
  readonly formDialogData = this.data;


  close(): void {
    this.dialogRef.close('complete');
  }
}
