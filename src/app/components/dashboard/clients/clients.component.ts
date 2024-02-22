import { AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { CompanyService } from 'src/app/shared/services/company.service';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { Clients } from 'src/app/intefaces/clients'


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatButtonModule, 
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule
  ],
})
export class ClientsComponent implements AfterViewInit {
  companies:Clients[] = []
  checked = false
  companiesTableColumns: string[] = [
    'companyname', 'documentNumber', 'status', 'acciones'
  ];
  
  dataSource = new MatTableDataSource<Clients>();
  
  constructor(private companyService: CompanyService){
    this.getCompanies()
  }
  getCompanies(){
    this.companyService.getClients().subscribe((data: any) => {
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



