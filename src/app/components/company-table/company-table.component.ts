import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortable, Sort } from '@angular/material/sort';
import { Company } from '../../intefaces/company.interface';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/shared/services/company.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientComponent } from '../client/client.component';
import { CompanyComponent } from '../company/company.component';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css'],
  standalone: true,
  imports: [
    MatTableModule, CommonModule, TranslateModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatDialogModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule,
    MatFormFieldModule, MatSortModule
  ]
})
export class CompanyTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id', 'name', 'businessName', 'address', 'country', 'city', 'state', 'documentType', 'document', 'acciones'
  ];
  dataSource = new MatTableDataSource<Company>();
  companies: Company[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private companyService: CompanyService, private cdr: ChangeDetectorRef,
      private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.companyService.getCompanies().subscribe((data: any) => {
      this.companies = data;
      this.dataSource.data = this.companies;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.sort({id: 'id', start: 'desc', disableClear: false} as MatSortable);
        const sortState: Sort = {active: 'id', direction: 'desc'};
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
        this.dataSource.sort = this.sort;
      this.sort.direction = 'desc'; // Establece el orden inicial como descendente
      this.sort.active = 'id'; // Establece 'ID' como la columna activa para ordenar
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

  openCompanyModal() {
    const maxId = this.companies.length > 0 ? Math.max(...this.companies.map(company => parseInt(company.id))) : 0;
    const dialogRef = this.dialog.open(CompanyComponent, {
      width: '600px',
      data: {} // Puedes pasar datos al modal si es necesario
    });
  
    dialogRef.afterClosed().subscribe((newCompany: Company) => {
      if (newCompany) {
        // Manejar los datos del formulario devueltos por CompanyComponent
        console.log(newCompany, maxId);
        newCompany.id =( maxId + 1).toString();
        this.companies.push(newCompany); // Agregar la nueva empresa al arreglo
        this.dataSource.data = this.companies; // Actualizar el dataSource de la tabla
      }
    });
  }
  
  
  openDialog(id: string) {
    // Implementación para abrir el diálogo de edición
  }

  openDelete(id: string) {
    // Implementación para abrir el diálogo de eliminación
  }
}
