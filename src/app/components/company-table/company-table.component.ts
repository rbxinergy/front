import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortable, Sort } from '@angular/material/sort';
import { Company } from '../../interfaces/company.interface';
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
import { CompanyComponent } from '../company/company.component';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientDataService } from 'src/app/services/client-data.service'; 
import { Client } from 'src/app/interfaces/client.interface';

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
export class CompanyTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id', 'name', 'businessName', 'address', 'country', 'city', 'state', 'documentType', 'document', 'acciones'
  ];
  dataSource = new MatTableDataSource<Company>();
  companies: Company[] = [];
  selectedCompany: Company | null = null;

  formCompanyTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @Input() clientName: string;
  client: Client | null = null;

  constructor(private companyService: CompanyService, private cdr: ChangeDetectorRef,
      private dialog: MatDialog, private clientDataService: ClientDataService) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngAfterViewInit(): void {
    // this.loadClientData();
  }

  // loadClientData() {
  //   this.client = this.clientDataService.getClientData();
  //   console.log('client', this.client);
  //   this.loadCompanies(this.client.name);
  // }

  // loadCompanies(clientName: string) {
  //   console.log('clientName', clientName);
  //   this.companyService.getCompaniesByGroup(clientName).subscribe(companies => {
  //     this.companies = companies;
  //     this.dataSource.data = this.companies;
  //     if(companies.length === 0){
  //       console.log('No hay empresas');
  //       this.formCompanyTable.controls['tempControl'].setValue('');
  //     }
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this.sort.sort({id: 'id', start: 'desc', disableClear: false} as MatSortable);
  //     const sortState: Sort = {active: 'id', direction: 'desc'};
  //     this.sort.active = sortState.active;
  //     this.sort.direction = sortState.direction;
  //     this.sort.sortChange.emit(sortState);
  //     this.dataSource.sort = this.sort;
  //     this.sort.direction = 'desc';
  //     this.sort.active = 'id';
  //     this.cdr.detectChanges();
  //   });
  // }

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

  openNewCompanyModal() {
    const maxId = this.companies.length > 0 ? Math.max(...this.companies.map(company => parseInt(company.id))) : 0;
    const dialogRef = this.dialog.open(CompanyComponent, {
      width: '600px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe({
      next: (newCompany: Company) => {
        if (newCompany) {
          this.companyService.createCompany(newCompany).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Compañía creada exitosamente.', type: 'success' }
                });
                newCompany.id = (maxId + 1).toString();
                this.companies.push(response.body);
                this.dataSource.data = this.companies;
                this.formCompanyTable.controls['tempControl'].setValue(newCompany.name);
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Error al crear la compañía.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: { message: 'Error al crear la compañía.', type: 'error' }
              });
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al abrir el modal de nueva empresa:', error);
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }
  
  openEditCompanyModal(company: Company) {
    console.log(company)
    this.selectedCompany = { ...company };
    const dialogRef = this.dialog.open(CompanyComponent, {
      width: '600px',
      data: this.selectedCompany
    });

    dialogRef.afterClosed().subscribe({
      next: (updatedCompany: Company) => {
        if (updatedCompany) {
          this.companyService.updateCompany(updatedCompany).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Empresa actualizada exitosamente.', type: 'success' }
                });
                const index = this.companies.findIndex(c => c.id === updatedCompany.id);
                if (index !== -1) {
                  this.companies[index] = updatedCompany;
                  this.dataSource.data = this.companies;
                }
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al actualizar la empresa.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al actualizar la empresa.', type: 'error' }
              });
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }

  openDeleteCompanyModal(company: Company) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Está seguro de que deseas eliminar la compañía ${company.name}?`,
        type: 'error'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.companyService.deleteCompany(company.id).subscribe({
            next: (response) => {
              console.log('response', response.body);
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Compañía eliminada exitosamente.', type: 'success' }
                });
                console.log('company', company);
                this.companies = this.companies.filter(c => c.id !== company.id);
                if(this.companies.length === 0){
                  this.formCompanyTable.controls['tempControl'].setValue(null);
                }
                this.dataSource.data = this.companies;
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al eliminar la compañía.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al eliminar la compañía.', type: 'error' }
              });
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }
}
