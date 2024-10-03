import { Component, ViewChild } from '@angular/core';
import { Company } from './interfaces/company.interface';
import { CompanyService } from '../services/company.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { DeleteComponent } from '../components/dashboard/company/delete/delete.component';
import { EditComponent } from '../components/dashboard/company/edit/edit.component';
import { FilePreviewDialogComponent } from '../components/file-preview-dialog/file-preview-dialog.component';
import { MessagesModalComponent } from '../components/messages-modal/messages-modal.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule
  ]
})
export class CompanyComponent {
  isLoading = true
  companies: Company[] = []
  checked = false
  companiesTableColumns: string[] = [
    'name', 'documentType', 'documentNumber', 'status', 'acciones'
  ];
  client: string = sessionStorage.getItem('client') || '';
  dataSource = new MatTableDataSource<Company>();
  selectedFile: File | null = null;
  formCompanyTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private companyService: CompanyService, public dialog: MatDialog,
    private router: Router){
    this.getCompanies()
  }

  getCompanies(){
    this.companyService.getCompaniesByClient(this.client).subscribe((data: any) => {
      this.companies = data;
      this.isLoading = false;
      this.dataSource.data = data
    })
  }

  openEdit(id:number){
    const result: any[] = this.companies.filter((company:any) => company.id === id);
    this.dialog.open(EditComponent, { 
      data: result[0]
    }) 
  }

  openDelete(id:number){
    const result: any[] = this.companies.filter((company:any) => company.id === id);
    this.dialog.open(DeleteComponent, { 
      data: result[0]
    }) 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openConfig(idCompany: string, idGroupCompany: string) {
    this.router.navigate(['dashboard/company/company-config', idCompany, idGroupCompany]);
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

        },
        (error) => {

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
    const dialogRef = this.dialog.open(NewCompanyComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      delete result.id
      result.idClient = this.client
      this.companyService.createCompany(result).subscribe({
        next: (response) => {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Empresa creada exitosamente.', type: 'success' }
          });
          this.getCompanies()
        },
        error: (error) => {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Error al crear la empresa.', type: 'error' }
          });
        }
      })
    });
  }

  bulkLoad(): void {
    this.router.navigate(['/dashboard/bulk-upload']);
  }
}
