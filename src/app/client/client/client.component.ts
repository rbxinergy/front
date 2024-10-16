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
  
  constructor(private clientService: ClientService, private router: Router,
    private dialog: MatDialog) {
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

  openNewGroupCompanyModal(element: any) {
    console.log(element);
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
                  data: { message: 'Cliente actualizado exitosamente.', type: 'success' }
                });
                
                const index = this.clients.findIndex(c => c.id === updatedClient.id);
                if (index !== -1) {
                  this.clients[index] = response.body;
                  this.dataSource.data = this.clients;
                }
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al actualizar el cliente.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al actualizar el cliente.', type: 'error' }
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
}
