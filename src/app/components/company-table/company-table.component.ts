import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Company } from '../../intefaces/company.interface';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/shared/services/company.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css'],
  standalone: true,
  imports: [
    MatTableModule, CommonModule, TranslateModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatDialogModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule,
    MatFormFieldModule
  ]
})
export class CompanyTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name', 'businessName', 'address', 'country', 'city', 'state', 'documentType', 'document', 'acciones'
  ];
  dataSource = new MatTableDataSource<Company>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private companyService: CompanyService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.companyService.getCompanies().subscribe((data: any) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    const event = { target: input } as Event & { target: HTMLInputElement };
    this.applyFilter(event);
  }

  addCompany() {
    // Implementación para agregar una nueva empresa
    console.log('Agregar empresa');
  }
  
  
  openDialog(id: string) {
    // Implementación para abrir el diálogo de edición
  }

  openDelete(id: string) {
    // Implementación para abrir el diálogo de eliminación
  }
}
