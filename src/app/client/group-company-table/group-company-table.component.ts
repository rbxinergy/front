import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortable, Sort } from '@angular/material/sort';
import { GroupCompany } from '../../interfaces/groupcompany.interface';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessagesModalComponent } from '../../components/messages-modal/messages-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientDataService } from '../services/client-data.service'; 
import { Client } from 'src/app/interfaces/client.interface';
import { GroupCompanyService } from 'src/app/services/groupcompany.service';
import { GroupcompanyComponent } from '../groupcompany/groupcompany.component';
import { GroupcompanyDataService } from 'src/app/services/groupcompany-data.service';
import { BaseComponent } from 'src/app/shared/core/base-componente.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCategoryTableComponent } from '../service-category-table/service-category-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BulkUploadComponent } from '../../components/bulk-upload/bulk-upload.component';

@Component({
  selector: 'app-group-company-table',
  templateUrl: './group-company-table.component.html',
  styleUrls: ['./group-company-table.component.scss'],
  standalone: true,
  imports: [
    MatTableModule, CommonModule, TranslateModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatDialogModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule,
    MatFormFieldModule, MatSortModule,  MatProgressSpinnerModule
  ]
})
export class GroupCompanyTableComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    'name', 'description', 'tag', 'acciones'
  ];
  dataSource = new MatTableDataSource<GroupCompany>();
  groupCompanies: GroupCompany[] = [];
  selectedGroupCompany: GroupCompany | null = null;
  isLoading = false

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
    super();
  }


  ngOnInit() {
    console.log(this.clientDataService.getClientData());
    this.clientID = this.clientDataService.getClientData().id;
  }

  getGroupCompanies(): void {
    this.isLoading = true
    this.groupCompanyService.getGroupCompanies(this.clientID).subscribe({
      next: (data: any) => {
        this.dataSource.data = data.body 
        this.groupCompanies = data.body
      },
      error: (error: any) => { },
      complete: () => {
        this.isLoading = false
      }
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

  openBulkUpload(){
    const dialogRef = this.dialog.open(BulkUploadComponent, {
      width: '600px',
      data: {}
    });
  }
  openNewGroupCompanyModal() {
    const dialogRef = this.dialog.open(GroupcompanyComponent, {
      width: '600px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe({
      next: (newGroupCompany: GroupCompany) => {
        if (newGroupCompany) {
          newGroupCompany.idClient = this.clientID;
          delete newGroupCompany.id;
          this.groupCompanyService.createGroupCompany(newGroupCompany).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.groupCompanyDataService.setGroupCompanyData(response.body);
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: {
                    message: 'Grupo creado exitosamente.',
                    type: 'success',
                    showCancel: false
                  }
                });
                this.getGroupCompanies();
                this.formGroupCompanyTable.controls['tempControl'].setValue(response.body.name);
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: {
                    message: 'Error al crear el grupo.',
                    type: 'error',
                    showCancel: false
                  }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: {
                  message: 'Error al crear el grupo.',
                  type: 'error',
                  showCancel: false
                }
              });
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: {
            message: 'Error al cerrar el diálogo.',
            type: 'error',
            showCancel: false
          }
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

  }

}
