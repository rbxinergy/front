import { ChangeDetectorRef, Component, Inject, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DomainCategoryService } from '../../services/domaincategory.service';
import { DomainCategory } from '../../interfaces/domaincategory.interface';
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
import { Company } from 'src/app/interfaces/company.interface';
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
import { DomainComponent } from '../domain/domain.component';
import { DomainTableComponent } from '../domain-table/domain-table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-domain-category-table',
  templateUrl: './domain-category-table.component.html',
  styleUrls: ['./domain-category-table.component.css'],
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
    
    // MatSelectModule, MatSnackBarModule, MatTooltipModule, 
  ]
})

// Para crear cat de dominio necesito el idGroupCompany que viene del paso 2 del stepper
export class DomainCategoryTableComponent {
  // displayedColumns: string[] = ['select', 'id', 'name'];
  displayedColumns: string[] = ['select', 'id', 'name', 'description', 'tag', 'acciones'];
  dataSource = new MatTableDataSource<DomainCategory>();
  selection = new SelectionModel<DomainCategory>(true, []);

  domainCategories: DomainCategory[]| null  = [];
  selectedDomainCategory: DomainCategory | null = null;
  
  formDomainCategoryTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });

  groupCompany: GroupCompany | null = null;
  groupCompanyID: any

  
  constructor(private domainCategoryService: DomainCategoryService, private dialog: MatDialog, private cdr: ChangeDetectorRef, 
    private groupCompanyDataService: GroupcompanyDataService, private route: ActivatedRoute
    // @Inject(MAT_DIALOG_DATA) public data: GroupCompany
  ) {
      // if(data){
      //   console.log(data)
      //   this.groupCompany = data
      //   this.groupCompanyDataService.setGroupCompanyData(data);
      // } else {
      //   this.groupCompany = this.groupCompanyDataService.getGroupCompanyData();
      // }

    // this.groupCompany = this.groupCompanyDataService.getGroupCompanyData();
    // console.log("GROUPCOMPANY: ", this.groupCompany)
    // this.domainCategoryService.getallDomainCategories(this.groupCompanyID).subscribe((domainCategories: DomainCategory[]) => {
    //   this.dataSource.data = domainCategories;
    //   this.domainCategories = domainCategories
    //   console.log(domainCategories)
    // });
  }



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit() {
    console.log('domain',  this.groupCompanyID = this.route.snapshot.paramMap.get('groupCompany') || '')
    this.groupCompanyID = this.route.snapshot.paramMap.get('groupCompany') || ''
  }

  ngAfterViewInit(): void {
    this.domainCategoryService.getallDomainCategories(this.groupCompanyID).subscribe((domainCategories: DomainCategory[]) => {
      this.dataSource.data = domainCategories;
      this.domainCategories = domainCategories
      console.log(domainCategories)
    });
  }
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
  checkboxLabel(row?: DomainCategory): string {
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

  addDomainModal(domainCategory: DomainCategory){
    const dialogRef = this.dialog.open(DomainTableComponent, {
      width: '90%',
      data:  domainCategory
    });
  }
  // Add domain categories to Group Company
  addDomainCategories() {
    console.log(this.selection.selected);
    const maxId = this.domainCategories.length > 0 ? Math.max(...this.domainCategories.map(company => parseInt(company.id))) : 0;
    const dialogRef = this.dialog.open(DomaincategoryComponent, {
      width: '600px',
      data:  {}
    });

      dialogRef.afterClosed().subscribe({
      next: (newDomainCategory: DomainCategory) => {
        if (newDomainCategory) {
          newDomainCategory.idGroupCompany = this.groupCompanyID
          console.log(newDomainCategory)
          this.domainCategoryService.createDomainCategory(newDomainCategory).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Categoría de dominio creada exitosamente.', type: 'success' }
                });
                newDomainCategory.id = (maxId + 1).toString();
                this.domainCategories.push(response.body);
                this.dataSource.data = this.domainCategories;
                this.formDomainCategoryTable.controls['tempControl'].setValue(newDomainCategory.name);
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
  
  editDomainCategoryModal(domainCategory: DomainCategory) {
    console.log(domainCategory)
    this.selectedDomainCategory = { ...domainCategory };
    const dialogRef = this.dialog.open(DomaincategoryComponent, {
      width: '600px',
      data: this.selectedDomainCategory
    });
  
    dialogRef.afterClosed().subscribe({
      next: (updatedDomainCategory: DomainCategory) => {
        if (updatedDomainCategory) {
          updatedDomainCategory.idGroupCompany = this.groupCompany?.id
          this.domainCategoryService.updateDomainCategory(updatedDomainCategory).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Categoría de dominio actualizado exitosamente.', type: 'success' }
                });
                const index = this.domainCategories.findIndex(c => c.id === updatedDomainCategory.id);
                if (index !== -1) {
                  this.domainCategories[index] = updatedDomainCategory;
                  this.dataSource.data = this.domainCategories;
                }
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al actualizar la categoría de dominio.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al actualizar la categoría de dominio.', type: 'error' }
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
  
  deleteDomainCategoryModal(domainCategory: DomainCategory) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Está seguro de que deseas eliminar la categoría de dominio ${domainCategory.name}?`,
        type: 'error'
      }
    });
  
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.domainCategoryService.deleteDomainCategory(domainCategory.id).subscribe({
            next: (response) => {
              console.log('response', response.body);
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Categoría de dominio eliminada exitosamente.', type: 'success' }
                });
                console.log('Categoría de dominio', domainCategory);
                this.domainCategories = this.domainCategories.filter(c => c.id !== domainCategory.id);
                if(this.domainCategories.length === 0){
                  this.formDomainCategoryTable.controls['tempControl'].setValue(null);
                }
                this.dataSource.data = this.domainCategories;
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













