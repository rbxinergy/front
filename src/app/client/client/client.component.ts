import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Client } from '../interfaces/client.interface';
import { MatPaginator } from '@angular/material/paginator';
import { ClientService } from '../services/client.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { BaseComponent } from 'src/app/shared/core/base-componente.component';
import { LoadingOverlayComponent } from "../../components/loading-overlay/loading-overlay.component";
import { MessagesModalComponent } from 'src/app/components/messages-modal/messages-modal.component';
import { NewClientComponent } from '../new-client/new-client.component';
import { DomainCategoryComponent } from '../domain-category/domain-category.component';
import { DomainCategory } from 'src/app/interfaces/domaincategory.interface';
import { DomainCategoryService } from 'src/app/services/domaincategory.service';
import { ServiceCategory } from 'src/app/interfaces/servicecategory.interface';
import { ServiceCategoryService } from 'src/app/services/servicecategory.service';
import { CompanyComponent } from 'src/app/company/company.component';
import { Company } from '../interfaces/company.interface';
import { CompanyService } from 'src/app/services/company.service';
import { OrganizationComponent } from '../organization/organization.component';
import { GroupCompany } from 'src/app/interfaces/groupcompany.interface';
import { GroupCompanyService } from 'src/app/services/groupcompany.service';
import { GroupcompanyComponent } from '../groupcompany/groupcompany.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule,
    MatMenuModule, MatIconModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, TranslateModule, MatProgressSpinnerModule,
    MatProgressBarModule, MatDividerModule, MatStepperModule,
    LoadingOverlayComponent, MatStepperModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent extends BaseComponent implements AfterViewInit {
  isLoading: boolean = false;
  uploadProgress: number = 0;
  clientsTableColumns: string[] = ['name', 'businessName', 'address', 'country', 'documentType', 'document', 'acciones'];
  dataSource = new MatTableDataSource<Client>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedClient: any;
  clients: Client[];
  
  constructor(private clientService: ClientService, private domainCategoryService: DomainCategoryService,
    private serviceCategoryService: ServiceCategoryService, private router: Router, private dialog: MatDialog,
    private groupCompanyService: GroupCompanyService
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.isLoading = true;
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe((clients: HttpResponse<Client[]>) => {
      this.clients = clients.body || [];
      const sortedClients = (clients.body || []).sort((a, b) => {
        const dateA = new Date(a.createdDate).getTime();
        const dateB = new Date(b.createdDate).getTime();
        return dateB - dateA;
      });
      this.dataSource.data = sortedClients;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  } 

  openNewGroupCompanyModal(client: Client) {
    const dialogRef = this.dialog.open(GroupcompanyComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe({
      next: (organization: GroupCompany) => {
        if (organization) { 
          organization.idClient = client.id;
          this.isLoading = true;
          this.groupCompanyService.createGroupCompany(organization).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: {
                    message: 'Organización creada exitosamente.',
                    type: 'success',
                    buttons: 'aceptar'
                  }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: {
                  message: 'Error al crear la organización.',
                  type: 'error',
                  buttons: 'aceptar'
                }
              });
              this.isLoading = false;
            },
            complete: () => {
              this.isLoading = false;
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: {
            message: 'Error al cerrar el diálogo.',
            type: 'error',
            buttons: 'aceptar'
          }
        });
        this.isLoading = false;
      }
    });
  }

  openEditClientModal(client: Client) {
    this.selectedClient = { ...client };
    const dialogRef = this.dialog.open(NewClientComponent, {
      width: '600px',
      data: this.selectedClient
    });

    dialogRef.afterClosed().subscribe({
      next: (updatedClient: Client) => {
        if (updatedClient) {  
          updatedClient.idContact = [];
          this.isLoading = true;
          this.clientService.updateClient(updatedClient).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: {
                    message: 'Cliente actualizado exitosamente.',
                    type: 'success',
                    buttons: 'aceptar'
                  }
                });
                
                const index = this.clients.findIndex(c => c.id === updatedClient.id);
                if (index !== -1) {
                  this.clients[index] = response.body;
                  this.dataSource.data = this.clients;
                }
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: {
                    message: 'Error al actualizar el cliente.',
                    type: 'error',
                    buttons: 'aceptar'
                  }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: {
                  message: 'Error al actualizar el cliente.',
                  type: 'error',
                  buttons: 'aceptar'
                }
              });
              this.isLoading = false;
            },
            complete: () => {
              this.isLoading = false;
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: {
            message: 'Error al cerrar el diálogo.',
            type: 'error',
            buttons: 'aceptar'
          }
        });
        this.isLoading = false;
      }
    });
  }

  openDeleteCompanyModal(client: Client, cascade: boolean = false) {
    const dialogRef = this.dialog.open(MessagesModalComponent, {
      width: '500px',
      data: {
        message: cascade ? 'Al borrar este cliente, se borrarán también todos elementos asociados. ¿Está seguro de continuar?' : '¿Está seguro de que desea eliminar este cliente?',
        type: 'warning',
        buttons: 'cancelar-continuar'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.isLoading = true;
          this.clientService.deleteClient(client.id, cascade).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: {
                    message: 'Cliente eliminado exitosamente.',
                    type: 'success',
                    buttons: 'aceptar'
                  }
                });
                this.getClients();
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: {
                    message: 'Error al eliminar el cliente.',
                    type: 'error',
                    buttons: 'aceptar'
                  }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: {
                  message: 'Error al eliminar el cliente.',
                  type: 'error',
                  buttons: 'aceptar'
                }
              });
              this.isLoading = false;
            },
            complete: () => {
              this.isLoading = false;
            }
          })
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: {
            message: 'Error al eliminar el cliente.',
            type: 'error',
            buttons: 'aceptar'
          }
        });
        this.isLoading = false;
      }
    });
  }

  cancelUpload() {
    this.uploadProgress = 0;
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
  }

  openBulkUpload() {
    console.log('openBulkUpload');
  }

  newClient() {
    this.router.navigate(['dashboard/client-module/new-client']);
  }

  openDomainCategoryModal(client: Client) {
    const dialogRef = this.dialog.open(DomainCategoryComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe({
      next: (domainCategory: DomainCategory) => {
        if (domainCategory) { 
          domainCategory.idClient = client.id;
          domainCategory.idGroupCompany = '';
          this.isLoading = true;
          this.domainCategoryService.createDomainCategory(domainCategory).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Categoría de dominio creada exitosamente.', type: 'success' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al crear la categoría de dominio.', type: 'error' }
              });
              this.isLoading = false;
            },
            complete: () => {
              this.isLoading = false;
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
        this.isLoading = false;
      }
    });
  }

  openServiceCategoryModal(client: Client) {
    const dialogRef = this.dialog.open(DomainCategoryComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe({
      next: (serviceCategory: ServiceCategory) => {
        if (serviceCategory) { 
          serviceCategory.idClient = client.id;
          serviceCategory.idGroupCompany = '';
          this.isLoading = true;
          this.serviceCategoryService.createServiceCategory(serviceCategory).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Categoría de servicios creada exitosamente.', type: 'success' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al crear la categoría de servicios.', type: 'error' }
              });
              this.isLoading = false;
            },
            complete: () => {
              this.isLoading = false;
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
        this.isLoading = false;
      }
    });
  }
}
