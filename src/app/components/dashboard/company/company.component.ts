import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CompanyService } from 'src/app/shared/services/company.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Companies } from 'src/app/intefaces/companies'

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
    MatMenuModule
  ]
})
export class CompanyComponent implements AfterViewInit {
  
  companies:Companies[] = []
  checked = false
  companiesTableColumns: string[] = [
    'companyname', 'documentNumber', 'status', 'acciones'
  ];
  
  dataSource = new MatTableDataSource<Companies>();
  
 
  constructor(private companyService: CompanyService){
    this.getCompanies()
  }
  getCompanies(){
    this.companyService.getCompanies().subscribe((data: any) => {
      this.companies = data;
      this.dataSource.data = data
      console.log("Companies", this.dataSource.data)
    })
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
