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
import { DomainCategoryComponent } from '../domain-category/domain-category.component';
import { ServiceCategoryComponent } from '../service-category/service-category.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BaseComponent } from 'src/app/shared/core/base-componente.component';
import { TranslateModule } from '@ngx-translate/core';
import { DomainCategoryService } from '../../services/domaincategory.service';
import { ClientDataService } from '../services/client-data.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-domain-category-table',
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
    DomainCategoryComponent,
    ServiceCategoryComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    TranslateModule
  ],
  templateUrl: './domain-category-table.component.html',
  styleUrl: './domain-category-table.component.scss',
})
export class DomainCategoryTableComponent extends BaseComponent implements OnInit {

  domainCategories: any[] = [];
  domainCategoryTableColumns: string[] = ['name', 'tag', 'description', 'acciones'];
  uploadProgress = 0;
  isLoading = false;
  dataSource: any[] = [];

  constructor(private dialog: MatDialog, private domainCategoryService: DomainCategoryService,
    private clientDataService: ClientDataService
  ) {
    super();
  }

  ngOnInit(): void { }

  getDomainCategories() {
    const clientId = this.clientDataService.getClientData().id;
    this.domainCategoryService.getDomainCategoryByClient(clientId).subscribe((data: HttpResponse<any>) => {
      this.domainCategories = data.body;
      this.dataSource = this.domainCategories;
    });
  }

  openEditDomainCategoryModal(element: any) {

  }

  openDeleteDomainCategoryModal(element: any) {

  }

  cancelUpload() {

  }

  applyFilter(event: Event) {

  }

  clearSearch(input: any) {

  }

  openBulkUpload() {

  }

  newDomainCategory() {
    const dialogRef = this.dialog.open(DomainCategoryComponent, {
      width: '800px',
      height: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.idClient = this.clientDataService.getClientData().id;
        result.idGroupCompany = "";
        this.domainCategoryService.createDomainCategory(result).subscribe({
          next: () => {
            this.dialog.open(MessagesModalComponent, {
              data: {
                message: 'Se ha creado una nueva categoría de dominio.',
                buttonText: 'Aceptar',
                showCancel: false,
                type: 'success'
              }
            });
          },
          error: () => {
            this.dialog.open(MessagesModalComponent, {
              data: {
                message: 'Error al crear una nueva categoría de dominio.',
                buttonText: 'Aceptar',
                showCancel: false,
                type: 'error'
              }
            });
          },
          complete: () => {
            this.getDomainCategories();
          }
        });

      } else {
        this.dialog.open(MessagesModalComponent, {
          data: {
            message: 'Se ha cancelado la creación de una nueva categoría de dominio.',
            buttonText: 'Aceptar',
            showCancel: false,
            type: 'error'
          }
        });
      }
    });
  }

}
