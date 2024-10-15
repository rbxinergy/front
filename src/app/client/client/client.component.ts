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
import { NewClientComponent } from '../new-client/new-client.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { BaseComponent } from 'src/app/shared/core/base-componente.component';
import { LoadingOverlayComponent } from "../../components/loading-overlay/loading-overlay.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule,
    MatMenuModule, MatIconModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, TranslateModule, MatProgressSpinnerModule,
    MatProgressBarModule, MatDividerModule, MatStepperModule, LoadingOverlayComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent extends BaseComponent implements AfterViewInit {
  isLoading: boolean = false;
  uploadProgress: number = 0;
  clientsTableColumns: string[] = ['name', 'businessName', 'address', 'country', 'documentType', 'document', 'acciones'];
  dataSource = new MatTableDataSource<Client>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
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

  openEditClientModal(element: any) {
    console.log(element);
  }

  openDeleteCompanyModal(element: any) {
    console.log(element);
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
