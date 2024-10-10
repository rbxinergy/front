import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MessagesModalComponent } from '../../components/messages-modal/messages-modal.component';
import { ServiceCategoryComponent } from '../service-category/service-category.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BaseComponent } from 'src/app/shared/core/base-componente.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProvisionService } from '../services/provision.service';
import { ClientDataService } from '../services/client-data.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-service-category-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MessagesModalComponent,
    ServiceCategoryComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    TranslateModule
  ],
  templateUrl: './service-category-table.component.html',
  styleUrl: './service-category-table.component.scss',
})
export class ServiceCategoryTableComponent extends BaseComponent implements OnInit {

  serviceCategories: any[] = [];
  dataSource: any[] = [];
  serviceCategoryTableColumns: string[] = ['name', 'tag', 'description', 'acciones'];
  isLoading = false;
  uploadProgress = 0;
  clientId = "";

  constructor(private dialog: MatDialog, private provisionService: ProvisionService,
    private clientDataService: ClientDataService
  ) {
    super();
    this.clientId = this.clientDataService.getClientData()?.id || '';
  }

  ngOnInit(): void {

  }

  getServiceCategories(idClient: string) {
    this.provisionService.getProvisionsByClient(idClient).subscribe((data: HttpResponse<any>) => {
      this.serviceCategories = data.body;
      this.dataSource = this.serviceCategories;
    });
  }

  openEditServiceCategoryModal(element: any) {

  }

  openDeleteServiceCategoryModal(element: any) {

  }

  cancelUpload() {

  }

  applyFilter(event: Event) {

  }

  clearSearch(input: any) {

  }

  openBulkUpload() {

  }

  newServiceCategory() {
    const dialogRef = this.dialog.open(ServiceCategoryComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.idClient = this.clientId;
        result.idGroupCompany = "";
        this.provisionService.createProvision(result).subscribe({
          next: (response) => {
            this.dialog.open(MessagesModalComponent, {  
              data: {
                message: 'Se ha creado una nueva categoría de servicio.',
                buttonText: 'Aceptar',
                showCancel: false,
                type: 'success'
              }
            });
            this.serviceCategories = response.body;
            this.dataSource = this.serviceCategories;
            this.getServiceCategories(this.clientId);
          },
          error: (error) => {
            this.dialog.open(MessagesModalComponent, {  
              data: {
                message: 'Error al crear la categoría de servicio.',
                buttonText: 'Aceptar',
                showCancel: false,
                type: 'error'
              }
            });
          },
          complete: () => { }
        });
      } else {
        this.dialog.open(MessagesModalComponent, {
          data: {
            message: 'Se ha cancelado la creación de una nueva categoría de servicio.',
            buttonText: 'Aceptar',
            showCancel: false,
            type: 'error'
          }
        });
      }
    });
  }

}
