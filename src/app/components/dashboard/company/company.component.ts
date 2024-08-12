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

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
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
    MatInputModule
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
  fileUploaded = false;
  fileUploadedMessage = '';
  fileUploadedMessageType = '';

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

  openConfig(client: string, company?: string) {
    console.log('openConfig', client, company);
    const idclient = client != null ? client : sessionStorage.getItem('client');
    if (company) {
      console.log('openConfig', client, company);
      this.router.navigate(['/dashboard/company-config', idclient, company]);
    } else {
      this.router.navigate(['/dashboard/company-config', idclient]);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.companyService.uploadCSV(formData).subscribe(response => {
        console.log('Archivo subido exitosamente', response);
        // Aquí puedes agregar lógica adicional, como actualizar la lista de compañías
      }, error => {
        console.error('Error al subir el archivo', error);
      });
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  }
}
