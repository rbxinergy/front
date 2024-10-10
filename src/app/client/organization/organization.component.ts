import { Component, OnInit } from '@angular/core';
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
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CompanyService } from '../services/company.service';
import { Company } from '../interfaces/company.interface';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { BaseComponent } from 'src/app/shared/core/base-componente.component';
import { GroupcompanyDataService } from '../services/groupcompany-data.service';
import { GroupCompanyService } from '../services/groupcompany.service';
import { NewCompanyComponent } from '../new-company/new-company.component';
import { MessagesModalComponent } from '../../components/messages-modal/messages-modal.component';
import { GroupCompany } from '../interfaces/groupcompany.interface';


@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule,
    MatMenuModule, MatIconModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, TranslateModule, MatProgressSpinnerModule,
    MatProgressBarModule, MatDividerModule, MatStepperModule
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent extends BaseComponent implements OnInit {
  isLoading: boolean = false;
  uploadProgress: number = 0;
  clientsTableColumns: string[] = ['name', 'businessName', 'address', 'country', 'documentType', 'document', 'acciones'];
  dataSource = new MatTableDataSource<Company>();
  groupCompanies: GroupCompany[] = [];
  //groupCompany: GroupCompany;
  idClient: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private groupCompanyService: GroupCompanyService, private router: Router,
    private dialog: MatDialog, private groupCompanyDataService: GroupcompanyDataService,
    private companyService: CompanyService
  ) {
    super();
  }

  ngOnInit(): void {
    //this.groupCompany = this.groupCompanyDataService.getGroupCompanyData();
    this.idClient = this.groupCompanyDataService.getGroupCompanyData()?.id || '';
  }

  getGroupCompanies() {
    this.groupCompanyService.getGroupCompanies(this.idClient).subscribe({
      next: (groupCompanies: HttpResponse<GroupCompany[]>) => {
        this.groupCompanies =  groupCompanies.body || [];
        this.isLoading = false;
      },
      error: (error: any) => {
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getCompanies(idClient: string) {
    this.companyService.getCompaniesByClient(idClient).subscribe({
      next: (companies: HttpResponse<Company[]>) => {
        this.dataSource.data = companies.body || [];
      },
      error: (error: any) => {
      },
      complete: () => {
        this.isLoading = false;
      }
    })
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

  newCompany() {
    this.dialog.open(NewCompanyComponent).afterClosed().subscribe((result: any) => {
      if (result) {
        result.idClient = this.idClient;
        delete result.id;
        this.companyService.createCompany(result).subscribe({
          next: (company: HttpResponse<Company>) => {
            this.getCompanies(this.idClient);
            this.dialog.open(MessagesModalComponent, {
              data: {
                message: 'Se ha creado una nueva empresa.',
                buttonText: 'Aceptar',
                showCancel: false,
                type: 'success'
              }
            });
          },
          error: (error: any) => {
            this.dialog.open(MessagesModalComponent, {
              data: {
                message: 'Error al crear una nueva empresa.',
                buttonText: 'Aceptar',
                showCancel: false,
                type: 'error'
              }
            });
          },
          complete: () => {
            this.isLoading = false;
            this.getGroupCompanies();
          }
        })
      } else {
        this.dialog.open(MessagesModalComponent, {
          data: {
            message: 'Se ha cancelado la creación de una nueva empresa.',
            buttonText: 'Aceptar',
            showCancel: false,
            type: 'error'
          }
        });
      }
    });
  }
}
