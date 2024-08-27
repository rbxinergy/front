import { ChangeDetectorRef, Component, Inject, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ServiceCategoryService } from '../../services/servicecategory.service';
import { ServiceCategory } from '../../interfaces/servicecategory.interface';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortable, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { DomaincategoryComponent } from '../domaincategory/domaincategory.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Domain } from 'src/app/interfaces/domain.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from 'src/app/company/interfaces/company.interface';
import { ClientDataService } from 'src/app/services/client-data.service';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyComponent } from '../company/company.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { GroupcompanyDataService } from 'src/app/services/groupcompany-data.service';
import { GroupCompany } from 'src/app/interfaces/groupcompany.interface';
import { ServicecategoryComponent } from '../servicecategory/servicecategory.component';

@Component({
  selector: 'app-service-category-table',
  templateUrl: './service-category-table.component.html',
  styleUrls: ['./service-category-table.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    TranslateModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, 
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class ServiceCategoryTableComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'description', 'tag', 'acciones'];
  dataSource = new MatTableDataSource<ServiceCategory>();
  selection = new SelectionModel<ServiceCategory>(true, []);

  serviceCategories: ServiceCategory[]| null  = [];
  selectedServiceCategory: ServiceCategory | null = null;
  
  formServiceCategoryTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });

  groupCompany: GroupCompany | null = null;
  
  constructor(private serviceCategoryService: ServiceCategoryService, private dialog: MatDialog, private cdr: ChangeDetectorRef, 
    private groupCompanyDataService: GroupcompanyDataService, private dialogRef: MatDialogRef<ServiceCategoryTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupCompany) {
      if(data){
        console.log(data)
        this.groupCompany = data
        this.groupCompanyDataService.setGroupCompanyData(data);
      } else {
        this.groupCompany = this.groupCompanyDataService.getGroupCompanyData();
      }
    this.groupCompany = this.groupCompanyDataService.getGroupCompanyData();
    console.log("GROUPCOMPANY: ", this.groupCompany)
    this.serviceCategoryService.getallServiceCategories(this.groupCompany).subscribe((domainCategories: ServiceCategory[]) => {
      this.dataSource.data = domainCategories;
      this.serviceCategories = domainCategories
      console.log(domainCategories)
    });
  }



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

//   @Input() clientName: string;
// client: Client | null = null;
  // ngOnInit(): void {
  //   this.userService.getUsers('client', 'company').subscribe((users: User[]) => {
  //     this.dataSource.data = users;
  //   });
  // }
  /** Si el número de elementos seleccionados coincide con el número total de filas. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selecciona todas las filas si no están todas seleccionadas; de lo contrario, limpia la selección. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** La etiqueta de la casilla de verificación en la fila pasada. */
  checkboxLabel(row?: ServiceCategory): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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

  // Add domain categories to Group Company
  addServiceCategories() {
    console.log(this.selection.selected);
    const maxId = this.serviceCategories.length > 0 ? Math.max(...this.serviceCategories.map(company => parseInt(company.id))) : 0;
    const dialogRef = this.dialog.open(ServiceCategoryService, {
      width: '600px',
      data:  {}
    });

      dialogRef.afterClosed().subscribe({
      next: (newServiceCategory: ServiceCategory) => {
        if (newServiceCategory) {
          newServiceCategory.idGroupCompany = this.groupCompany.id
          console.log(newServiceCategory)
          this.serviceCategoryService.createServiceCategory(newServiceCategory).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Categoría de dominio creada exitosamente.', type: 'success' }
                });
                newServiceCategory.id = (maxId + 1).toString();
                this.serviceCategories.push(response.body);
                this.dataSource.data = this.serviceCategories;
                this.formServiceCategoryTable.controls['tempControl'].setValue(newServiceCategory.name);
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Error al crear la categoría de dominio.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: { message: 'Error al crear la categoría de dominio.', type: 'error' }
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
  
  editServiceCategoryModal(serviceCategory: ServiceCategory) {
    this.selectedServiceCategory = { ...serviceCategory };
    const dialogRef = this.dialog.open(ServicecategoryComponent, {
      width: '600px',
      data: this.selectedServiceCategory
    });
  
    dialogRef.afterClosed().subscribe({
      next: (updatedServiceCategory: ServiceCategory) => {
        if (updatedServiceCategory) {
          updatedServiceCategory.idGroupCompany = this.groupCompany?.id

          this.serviceCategoryService.updateServiceCategory(updatedServiceCategory).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Categoría de servicio actualizado exitosamente.', type: 'success' }
                });
                const index = this.serviceCategories.findIndex(c => c.id === updatedServiceCategory.id);
                if (index !== -1) {
                  this.serviceCategories[index] = updatedServiceCategory;
                  this.dataSource.data = this.serviceCategories;
                }
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al actualizar la categoría de servicio.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al actualizar la categoría de servicio.', type: 'error' }
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
  
  deleteServiceCategoryModal(serviceCategory: ServiceCategory) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Está seguro de que deseas eliminar la categoría de dominio ${serviceCategory.name}?`,
        type: 'error'
      }
    });
  
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.serviceCategoryService.deleteServiceCategory(serviceCategory.id).subscribe({
            next: (response) => {
              console.log('response', response.body);
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Categoría de dominio eliminada exitosamente.', type: 'success' }
                });
                console.log('Categoría de dominio', serviceCategory);
                this.serviceCategories = this.serviceCategories.filter(c => c.id !== serviceCategory.id);
                if(this.serviceCategories.length === 0){
                  this.formServiceCategoryTable.controls['tempControl'].setValue(null);
                }
                this.dataSource.data = this.serviceCategories;
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al eliminar la categoría de dominio.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al eliminar la categoría de dominio.', type: 'error' }
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



















