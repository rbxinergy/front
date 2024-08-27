import { CommonModule, Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, Input, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortable, Sort } from '@angular/material/sort';
import { GroupCompany } from '../../interfaces/groupcompany.interface';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientDataService } from 'src/app/services/client-data.service'; 
import { Client } from 'src/app/interfaces/client.interface';
import { GroupCompanyService } from 'src/app/services/groupcompany.service';
import { GroupcompanyComponent } from '../groupcompany/groupcompany.component';
import { GroupcompanyDataService } from 'src/app/services/groupcompany-data.service';
import { Company } from 'src/app/company/interfaces/company.interface';
import { CompanyComponent } from '../company/company.component';
import { CompanyTableComponent } from '../company-table/company-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainCategoryTableComponent } from '../domain-category-table/domain-category-table.component';
import { ServiceCategoryTableComponent } from '../service-category-table/service-category-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BulkUploadComponent } from '../bulk-upload/bulk-upload.component';

@Component({
  selector: 'app-group-company-table',
  templateUrl: './group-company-table.component.html',
  styleUrls: ['./group-company-table.component.css'],
  standalone: true,
  imports: [
    MatTableModule, CommonModule, TranslateModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatDialogModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule,
    MatFormFieldModule, MatSortModule,  MatProgressSpinnerModule
  ]
})
export class GroupCompanyTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name', 'description', 'tag', 'acciones'
  ];
  dataSource = new MatTableDataSource<GroupCompany>();
  groupCompanies: GroupCompany[] = [];
  selectedGroupCompany: GroupCompany | null = null;
  isLoading = true

  formGroupCompanyTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @Input() clientName: string;
  client: Client | null = null;
  clientID: string = '';
  constructor(private groupCompanyService: GroupCompanyService, private cdr: ChangeDetectorRef,
      private dialog: MatDialog, private clientDataService: ClientDataService,
      private groupCompanyDataService: GroupcompanyDataService,private route: ActivatedRoute,private router: Router, private _location: Location ) {
      
      }
  // constructor(private groupCompanyService: GroupCompanyService, private cdr: ChangeDetectorRef,
  //      private clientDataService: ClientDataService, private groupCompanyDataService: GroupcompanyDataService,private route: ActivatedRoute,
  //     private dialog: MatDialog, private dialogRef: MatDialogRef<GroupCompanyTableComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: Client
  //   ) {
  //     if(data){
  //         this.client = data
  //         this.clientDataService.setClientData(data);
  //       } else {
  //         this.client = this.clientDataService.getClientData();
  //       }
  //     }

  ngOnInit() {
    this.clientID = this.route.snapshot.paramMap.get('client') || ''
  }

  ngAfterViewInit(): void {

    this.groupCompanyService.getGroupCompanies(this.clientID).subscribe({
      next: (data: any) => {
        this.dataSource.data = data.body 
        this.isLoading = false
        this.groupCompanies = data.body
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    
    //  this.groupCompanyDataService.setGroupCompanyData(data);
  }

  // loadClientData() {
  //   this.client = this.clientDataService.getClientData();
  //   console.log('client de loadClient', this.client.id);
  // }

  // loadGroups(clientName: string) {
  //   console.log('clientName', clientName);
  //   this.groupCompanyService.getGroupCompanies(clientName).subscribe(companies => {
  //     this.groupCompanies = companies;
  //     this.dataSource.data = this.groupCompanies;
  //     if(companies.length === 0){
  //       console.log('No hay empresas');
  //       this.formGroupCompanyTable.controls['tempControl'].setValue('');
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

  openBulkUpload(){
    const dialogRef = this.dialog.open(BulkUploadComponent, {
      width: '600px',
      data: {}
    });
  }
  openNewGroupCompanyModal() {
    const dialogRef = this.dialog.open(GroupcompanyComponent, {
      width: '80%',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe({
      next: (newGroupCompany: GroupCompany) => {
        console.log("NEW GROUP COMPANY:", newGroupCompany);
        if (newGroupCompany) {
          newGroupCompany.idClient = this.clientID;
          console.log('newGroupCompany', newGroupCompany);
          this.groupCompanyService.createGroupCompany(newGroupCompany).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.groupCompanyDataService.setGroupCompanyData(response.body);
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Grupo creado exitosamente.', type: 'success' }
                });
                this.groupCompanies.push(response.body);
                this.dataSource.data = this.groupCompanies;
                this.formGroupCompanyTable.controls['tempControl'].setValue(response.body.name);
                console.log('this.formGroupCompanyTable VALID', this.formGroupCompanyTable);
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Error al crear el grupo.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: { message: 'Error al crear el grupo.', type: 'error' }
              });
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al abrir el modal de nuevo grupo:', error);
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }

  addNewCompany(groupCompany: GroupCompany) {
    this.router.navigate(['dashboard/company', groupCompany.id]);
  }
  
  addNewDomainCategory(groupCompany: GroupCompany){
    this.router.navigate(['dashboard/domaincategory', groupCompany.id]);
  }

  openNewserviceCategoryModal(groupCompany: GroupCompany){
    const dialogRef = this.dialog.open(ServiceCategoryTableComponent, {
      width: '90%',
      data: groupCompany
    });
  }
  openEditGroupCompanyModal(company: GroupCompany) {
    this.selectedGroupCompany = { ...company };
    const dialogRef = this.dialog.open(GroupcompanyComponent, {
      width: '600px',
      data: this.selectedGroupCompany
    });

    dialogRef.afterClosed().subscribe({
      next: (updatedCompany: GroupCompany) => {
        if (updatedCompany) {
          this.groupCompanyService.updateGroupCompany(updatedCompany).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Grupo de empresas actualizado exitosamente.', type: 'success' }
                });
                const index = this.groupCompanies.findIndex(c => c.id === updatedCompany.id);
                if (index !== -1) {
                  this.groupCompanies[index] = response.body;
                  this.dataSource.data = this.groupCompanies;
                }
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al actualizar el grupo de empresas.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al actualizar el grupo de empresas.', type: 'error' }
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

  openDeleteGroupCompanyModal(groupCompany: GroupCompany) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Está seguro de que deseas eliminar el grupo ${groupCompany.name}?`,
        type: 'error'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.groupCompanyService.deleteGroupCompany(groupCompany.id).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Grupo de empresas eliminado exitosamente.', type: 'success' }
                });
                this.groupCompanies = this.groupCompanies.filter(c => c.id !== groupCompany.id);
                if(this.groupCompanies.length === 0){
                  this.formGroupCompanyTable.controls['tempControl'].setValue(null);
                }
                this.dataSource.data = this.groupCompanies;
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al eliminar el grupo de empresas.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al eliminar el grupo de empresas.', type: 'error' }
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

  goBack() {
    this._location.back();
  }
}
