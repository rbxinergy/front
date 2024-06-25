import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CompanyService } from 'src/app/services/company.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Companies } from 'src/app/interfaces/companies'
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
  ]
})
export class CompanyComponent implements AfterViewInit {
  isLoading = true
  companies:Companies[] = []
  checked = false
  companiesTableColumns: string[] = [
    'companyname', 'documentNumber', 'status', 'acciones'
  ];
  
  dataSource = new MatTableDataSource<Companies>();
  
  constructor(private companyService: CompanyService, public dialog: MatDialog){
    this.getCompanies()
  }
  getCompanies(){
    this.companyService.getCompanies().subscribe((data: any) => {
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
