import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CompanyService } from 'src/app/services/company.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Company } from 'src/app/company/interfaces/company.interface'
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { HttpResponse } from '@angular/common/http';
import { FilePreviewDialogComponent } from '../../file-preview-dialog/file-preview-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesModalComponent } from '../../messages-modal/messages-modal.component';
import { CompanyComponent as NewCompanyComponent } from '../../company/company.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  standalone: true,
  imports:[
    MatSlideToggleModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    FileUploadComponent
  ]
})
export class CompanyComponent implements AfterViewInit {
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
    this.router.navigate(['/dashboard/company-config', idCompany, idGroupCompany]);
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.companyService.uploadCSV(formData).subscribe(
        (response: HttpResponse<any>) => { },
        (error) => { }
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
