import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { DomainsService } from 'src/app/shared/services/domains.service';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Domains } from 'src/app/intefaces/domains'


@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule
  ]
  
})
export class ConfigsComponent implements AfterViewInit {

  domains:Domains[] = []

  domainsTableColumns: string[] = [
    'name', 'description', 'typename', 'companyname', 'acciones'
  ];
  
  dataSource = new MatTableDataSource<Domains>();
  
  constructor(private domainService: DomainsService){
    this.getDomains()
  }
  
  getDomains(){
    this.domainService.getDomains().subscribe((data: any) => {
      this.domains = data;
      this.dataSource.data = data
      console.log("Domains", this.dataSource.data)
    })
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
