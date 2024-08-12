import { AfterViewInit, Component, ViewChild, Inject, Input} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { CompanyService } from 'src/app/services/company.service';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EditComponent } from './edit/edit.component';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete.component';
import { MatDividerModule } from '@angular/material/divider';
import { Client } from '../../../interfaces/client.interface'
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { MessagesModalComponent } from '../../messages-modal/messages-modal.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription, finalize } from 'rxjs';
import { GroupCompanyTableComponent } from '../../group-company-table/group-company-table.component';
import { GroupcompanyComponent } from '../../groupcompany/groupcompany.component';
import { ClientComponent } from '../stepper/client/client.component';
import { ClientDataService } from 'src/app/services/client-data.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatButtonModule, 
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    TranslateModule,
    MatButtonModule,
    EditComponent,
    MatDialogModule,
    MatDividerModule,
    MatProgressBarModule
  ],
})
export class ClientsComponent implements AfterViewInit {
  @Input()
    requiredFileType:string;

    fileName = '';
    uploadProgress:number;
    uploadSub: Subscription;


  isLoading = true
  clients: Client[] = []
  selectedClient: Client | null = null;
  checked = false
  clientsTableColumns: string[] = [
    'name', 'businessName', 'address', 'country', 'documentType', 'document', 'acciones'
  ];

  dataSource = new MatTableDataSource<Client>();
  formClientTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });
  
  constructor(private companyService: CompanyService, private clientService: ClientService, private clientDataService: ClientDataService, public dialog: MatDialog, private router: Router, private http: HttpClient){
    this.getClients()
  }


  openDelete(id: string){
    const result: any[] = this.clients.filter((client:any) => client.id === id);
    this.dialog.open(DeleteComponent, { 
      data: result[0]
    }) 
  }

  // trae arreglo con clientes 
  getClients(){
    this.companyService.getClients().subscribe((data: any) => {
      this.isLoading = true;
      this.clients = data;
      this.dataSource.data = data
      this.isLoading = false;
    })
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  navigateToNewClient() {
    this.router.navigate(['/dashboard/new-client']);
  }

  onFileSelected(event: any){
    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("clientes", file);

      this.clientService.uploadClients(formData as unknown as Client).subscribe( {
        next: (response) => {
          if (response.status === 200) {
            // this.clientDataService.setClientData(response.body);
            this.dialog.open(MessagesModalComponent, {
              width: '400px',
              data: { message: 'Cliente creado exitosamente.', type: 'success' }
            });
          } else {
            this.dialog.open(MessagesModalComponent, {
              width: '400px',
              data: { message: 'Error al crear el cliente.', type: 'error' }
            });
          }
        },
        error: (error) => {
          console.log(error);
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Error al crear el cliente.', type: 'error' }
          });
        }
      });

      // const upload$ = this.http.post("https://xrisk-client-drzcbalp5q-uk.a.run.app/v1/client/create/upload/file", formData, {
      //     reportProgress: true,
      //     observe: 'events'
      // })
      // .pipe(
      //     finalize(() => this.reset())
      // );
    
      // this.uploadSub = upload$.subscribe(event => {
      //   if (event.type == HttpEventType.UploadProgress) {
      //     this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      //   }
      // })
  }
  }
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
  openNewGroupCompanyModal(client: Client){
    console.log("cliente", client)
    const dialogRef = this.dialog.open(GroupCompanyTableComponent, {
      width: '80%',
      data: client
    }); 
    // dialogRef.afterClosed().subscribe({
    //   next: (updatedClient: Client) => {
    //     if (updatedClient) {
    //       // updatedClient.idGroupCompany = this.groupCompany?.id;
    //       // updatedClient.idClient = this.client?.id
    //       console.log('updatedClient', updatedClient);
        
    //       this.clientService.updateClient(updatedClient).subscribe({
    //         next: (response) => {
    //           if (response.status === 200) {
    //             this.dialog.open(MessagesModalComponent, {
    //               width: '500px',
    //               data: { message: 'Cliente actualizado exitosamente.', type: 'success' }
    //             });
                
    //             const index = this.clients.findIndex(c => c.id === updatedClient.id);
    //             if (index !== -1) {
    //               this.clients[index] = response.body;
    //               this.dataSource.data = this.clients;
    //             }
    //           } else {
    //             this.dialog.open(MessagesModalComponent, {
    //               width: '500px',
    //               data: { message: 'Error al actualizar el cliente.', type: 'error' }
    //             });
    //           }
    //         },
    //         error: (error) => {
    //           this.dialog.open(MessagesModalComponent, {
    //             width: '500px',
    //             data: { message: 'Error al actualizar el cliente.', type: 'error' }
    //           });
    //         }
    //       });
    //     }
    //   },
    //   error: (error) => {
    //     this.dialog.open(MessagesModalComponent, {
    //       width: '500px',
    //       data: { message: 'Error al cerrar el diálogo.', type: 'error' }
    //     });
    //   }
    // });

  }

  openEditClientModal(client: Client) {
    console.log("cliente", client)
    this.selectedClient = { ...client };
    console.log("Seleccionado cliente", this.selectedClient)
    const dialogRef = this.dialog.open(EditComponent, {
      width: '600px',
      data: this.selectedClient
    });

    dialogRef.afterClosed().subscribe({
      next: (updatedClient: Client) => {
        if (updatedClient) {
          // updatedClient.idGroupCompany = this.groupCompany?.id;
          // updatedClient.idClient = this.client?.id
          console.log('updatedClient', updatedClient);
        
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

  

  openDeleteCompanyModal(client: Client) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Está seguro de que deseas eliminar el cliente ${client.name}?`,
        type: 'error'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.clientService.deleteClient(client.id).subscribe({
            next: (response) => {
              console.log('response', response.body);
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Cliente eliminado exitosamente.', type: 'success' }
                });
                console.log('client', client);
                this.clients = this.clients.filter(c => c.id !== client.id);
                if(this.clients.length === 0){
                  this.formClientTable.controls['tempControl'].setValue(null);
                }
                this.dataSource.data = this.clients;
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al eliminar el cliente.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al eliminar el cliente.', type: 'error' }
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
