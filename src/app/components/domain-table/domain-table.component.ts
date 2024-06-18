import { CommonModule, NgFor, NgIf } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortable, Sort } from '@angular/material/sort';
import { Domain } from '../../intefaces/domain.interface';
import { Company } from '../../intefaces/company.interface';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/services/company.service';
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
import { DomainComponent } from '../domain/domain.component';

@Component({
  selector: 'app-domain-table',
  templateUrl: './domain-table.component.html',
  styleUrls: ['./domain-table.component.css'],
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    MatTableModule, NgFor, NgIf, CommonModule, TranslateModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatDialogModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule,
    MatFormFieldModule, MatSortModule
  ]
})
export class DomainTableComponent {

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'description', 'code', 'tag'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Domain | null;


 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private cdr: ChangeDetectorRef, // private companyService: CompanyService
      private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    // this.companyService.getCompanies().subscribe((data: any) => {
    //   this.dataSource.data = this.companies;
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   this.sort.sort({id: 'id', start: 'desc', disableClear: false} as MatSortable);
    //     const sortState: Sort = {active: 'id', direction: 'desc'};
    //     this.sort.active = sortState.active;
    //     this.sort.direction = sortState.direction;
    //     this.sort.sortChange.emit(sortState);
    //     this.dataSource.sort = this.sort;
    //   this.sort.direction = 'desc'; // Establece el orden inicial como descendente
    //   this.sort.active = 'id'; // Establece 'ID' como la columna activa para ordenar
    //   this.cdr.detectChanges(); // Forzar la detección de cambios
      
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    const event = { target: input } as Event & { target: HTMLInputElement };
    this.applyFilter(event);
  }

  openCompanyModal() {
    const dialogRef = this.dialog.open(DomainComponent, {
        width: '600px',
        data: {} // Puedes pasar datos al modal si es necesario
      });
    // const maxId = this.companies.length > 0 ? Math.max(...this.companies.map(company => parseInt(company.id))) : 0;
    // const dialogRef = this.dialog.open(CompanyComponent, {
    //   width: '600px',
    //   data: {} // Puedes pasar datos al modal si es necesario
    // });
  
    // dialogRef.afterClosed().subscribe((newCompany: Company) => {
    //   if (newCompany) {
    //     // Manejar los datos del formulario devueltos por CompanyComponent
    //     console.log(newCompany, maxId);
    //     newCompany.id =( maxId + 1).toString();
    //     this.companies.push(newCompany); // Agregar la nueva empresa al arreglo
    //     this.dataSource.data = this.companies; // Actualizar el dataSource de la tabla
    //   }
    // });
  }
  
  
  openDialog(id: string) {
    // Implementación para abrir el diálogo de edición
  }

  openDelete(id: string) {
    // Implementación para abrir el diálogo de eliminación
  }
}


const ELEMENT_DATA: Domain[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Dominio 1",
    description: "12345",
    code: "12345",
    tag: ["legal-related"],
    idDomainCategory: "550e8400-e29b-41d4-a716-446655440000",
    idCompany: "550e8400-e29b-41d4-a716-446655440000",
    subdomains: [
      {
        name: "subdominio 1",
        description: "Este es el primer subdominio", 
        tag: "legal-related",
        idDomain:"550e8400-e29b-41d4-a716-446655440000"
      },
      {
        name: "subdominio 2",
        description: "Este es el segundo subdominio", 
        tag: "legal-related",
        idDomain:"550e8400-e29b-41d4-a716-446655440000"
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Cyberseguridad",
    description: "12345",
    code: "12345",
    tag: ["legal-related"],
    idDomainCategory: "550e8400-e29b-41d4-a716-446655440000",
    idCompany: "550e8400-e29b-41d4-a716-446655440000",
    subdomains: [
      {
        name: "Subdominio 1",
        description: "Este es el primer subdominio",
        tag: "legal-related",
        idDomain:"550e8400-e29b-41d4-a716-446655440001"
      },
      {
        name: "Subdominio 2",
        description: "Este es el segundo subdominio",
        tag: "legal-related",
        idDomain:"550e8400-e29b-41d4-a716-446655440001"
      },
      {
        name: "Subdominio 3",
        description: "Este es el tercer subdominio",
        tag: "legal-related",
        idDomain:"550e8400-e29b-41d4-a716-446655440001"
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Aseo",
    description: "12345",
    code: "12345",
    tag: ["legal-related"],
    idDomainCategory: "550e8400-e29b-41d4-a716-446655440000",
    idCompany: "550e8400-e29b-41d4-a716-446655440000",
    subdomains: [
      {
        name: "Subdominio 1",
        description: "Este es el primer subdominio",
        tag: "legal-related",
        idDomain:"550e8400-e29b-41d4-a716-446655440002"
      },
      {
        name: "Subdominio 2",
        description: "Este es el segundo subdominio",
        tag: "legal-related",
        idDomain:"550e8400-e29b-41d4-a716-446655440002"
      },
      {
        name: "Subdominio 3",
        description: "Este es el tercer subdominio",
        tag: "legal-related",
        idDomain:"550e8400-e29b-41d4-a716-446655440002"
      },
      {
        name: "Subdominio 4",
        description: "Este es el cuarto subdominio",
        tag: "legal-related",
        idDomain:"550e8400-e29b-41d4-a716-446655440002"
      },
    ]
  },
];