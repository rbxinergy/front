import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, Input, Inject } from '@angular/core';
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
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { CompanyDataService } from 'src/app/services/company-data.service';
import { GroupCompany } from 'src/app/interfaces/groupcompany.interface';
import { GroupcompanyDataService } from 'src/app/services/groupcompany-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleCfgTableComponent } from '../role-cfg-table/role-cfg-table.component';
import { CompanyConfigComponent } from '../company-config/company-config.component';
import { HttpResponse } from '@angular/common/http';
import { FilePreviewDialogComponent } from '../file-preview-dialog/file-preview-dialog.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css'],
  standalone: true,
  imports: [
    MatTableModule, CommonModule, TranslateModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatDialogModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule,
    MatFormFieldModule, MatSortModule, FileUploadComponent, MatProgressSpinnerModule
  ]
})
export class CompanyTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name', 'businessName', 'address', 'country', 'city', 'documentType', 'document', 'acciones'
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
  groupCompany: GroupCompany | null = null;
  groupCompanyID: any
  isLoading = true
  selectedFile: File | null = null;
  constructor(private companyService: CompanyService, private cdr: ChangeDetectorRef,
    private dialog: MatDialog, 
    private route: ActivatedRoute,
    private router: Router,
    // private dialogRef: MatDialogRef<CompanyTableComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: GroupCompany,
    private clientDataService: ClientDataService, 
    private groupCompanyDataService: GroupcompanyDataService ) {
      // if(data){
      //   this.groupCompany = data
      //   this.groupCompanyDataService.setGroupCompanyData(data);
      // } else {
      //   this.groupCompany = this.groupCompanyDataService.getGroupCompanyData();
      // }

      this.groupCompany = this.groupCompanyDataService.getGroupCompanyData();
      this.client= this.clientDataService.getClientData();
      console.log("datos: ", this.groupCompany, this.client)
    }



  ngOnInit() {
    this.groupCompanyID = this.route.snapshot.paramMap.get('groupCompany') || ''
  }


  ngAfterViewInit(): void {
    this.companyService.getCompaniesByGroup(this.groupCompanyID).subscribe(data => {
      this.isLoading = false
      this.dataSource.data = data
      this.companies = data
    })
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.companyService.uploadCSV(formData).subscribe(
        (response: HttpResponse<any>) => {
          console.log('File uploaded successfully', response);
        },
        (error) => {
          console.error('Error uploading file', error);
        }
      );
    }
  }

  onShowPreview(){
    this.dialog.open(FilePreviewDialogComponent, {
      width: '100%',
      data: { file: this.selectedFile }
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

  openNewCompanyModal() {
    const maxId = this.companies.length > 0 ? Math.max(...this.companies.map(company => parseInt(company.id))) : 0;
    const dialogRef = this.dialog.open(CompanyComponent, {
      width: '600px',
      data: {}
    });
   
    dialogRef.afterClosed().subscribe({
      next: (newCompany: Company) => {
        if (newCompany) {
          newCompany.idGroupCompany = this.groupCompany?.id;
          newCompany.idClient = this.groupCompany?.idClient
          console.log('newCompany', newCompany);
          this.companyService.createCompany(newCompany).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Empresa creada exitosamente.', type: 'success' }
                });
                this.companies.push(response.body);
                this.dataSource.data = this.companies;
                this.formCompanyTable.controls['tempControl'].setValue(response.body.name);
                console.log('this.formGroupCompanyTable VALID', this.formCompanyTable);
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Error al crear la empresa.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: { message: 'Error al crear la empresa.', type: 'error' }
              });
            }
          });
        }
        // if (newCompany) {
        //   newCompany.idGroupCompany = this.groupCompany?.id;
        //   newCompany.idClient = this.client?.id
        //   console.log('newCompany', newCompany);
        //   // this.companyService.createCompany(newCompany).subscribe({
        //   //   next: (response) => {
        //   //     if (response.status === 200) {
        //   //       this.dialog.open(MessagesModalComponent, {
        //   //         width: '400px',
        //   //         data: { message: 'Compañía creada exitosamente.', type: 'success' }
        //   //       });
        //   //       newCompany.id = (maxId + 1).toString();
        //   //       this.companies.push(response.body);
        //   //       this.dataSource.data = this.companies;
        //   //       this.formCompanyTable.controls['tempControl'].setValue(response.body.name);
        //   //     } else {
        //   //       this.dialog.open(MessagesModalComponent, {
        //   //         width: '400px',
        //   //         data: { message: 'Error al crear la compañía.', type: 'error' }
        //   //       });
        //   //     }
        //   //   },
        //   //   error: (error) => {
        //   //     this.dialog.open(MessagesModalComponent, {
        //   //       width: '400px',
        //   //       data: { message: 'Error al crear la compañía.', type: 'error' }
        //   //     });
        //   //   }
        //   // });
        // }
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
  
  openAddRolesModal(company?: Company) {
    this.router.navigate(['/dashboard/company-config', company.id]);
  }

  openSeeCompanyModal(company: Company) {
    console.log(company)
    this.selectedCompany = { ...company };
    const dialogRef = this.dialog.open(CompanyComponent, {
      width: '600px',
      data: this.selectedCompany
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
          updatedCompany.idGroupCompany = this.groupCompany?.id;
          updatedCompany.idClient = this.client?.id
          console.log('updatedCompany', updatedCompany);
          this.companyService.updateCompany(updatedCompany).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Empresa actualizada exitosamente.', type: 'success' }
                });
                
                const index = this.companies.findIndex(c => c.id === updatedCompany.id);
                if (index !== -1) {
                  this.companies[index] = response.body;
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
