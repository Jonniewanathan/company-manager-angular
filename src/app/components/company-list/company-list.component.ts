import {Component, OnDestroy, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../models/company';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CompanyFormModalComponent} from '../company-form-modal/company-form-modal.component';
import {AsyncPipe} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    AsyncPipe
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent implements OnInit, OnDestroy{
  datasource: MatTableDataSource<Company>;
  destroy$ = new Subject<void>();

  constructor(private service: CompanyService, private dialog: MatDialog) {
    this.datasource = new MatTableDataSource<Company>();
  }

  displayedColumns: string[] = ['name', 'ticker', 'exchange', 'isin', 'website', 'update'];

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.service.getCompanies().pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.datasource.data = x;
    });
  }

  openDialog(company?: Company): void {
    let dialogRef: MatDialogRef<CompanyFormModalComponent, any>;
    if (company){
      dialogRef = this.dialog.open(
        CompanyFormModalComponent,
        {
          height: '550px',
          width: '400px',
          data: {
            ...company,
            edit: true
          },
        });
    } else {
      dialogRef = this.dialog.open(
        CompanyFormModalComponent,
        {
          height: '550px',
          width: '400px',
          data: {
            edit: false
          },
        });
    }

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result === 'complete'){
        this.loadData();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
