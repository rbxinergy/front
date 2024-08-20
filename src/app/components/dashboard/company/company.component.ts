import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CompanyService } from 'src/app/services/company.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Company } from 'src/app/interfaces/company.interface'
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
      console.log("Companies", this.dataSource.data)
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
    console.log('openConfig', idCompany, idGroupCompany);
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
}
