import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { DomainsService } from 'src/app/shared/services/domains.service';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Domains } from 'src/app/intefaces/domains'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { SeeComponent } from './see/see.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MatButtonModule } from '@angular/material/button';


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
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule
  ]
  
})
export class ConfigsComponent implements AfterViewInit {
  isLoading = true

  domains:Domains[] = []

  domainsTableColumns: string[] = [
    'name', 'description', 'typename', 'companyname', 'acciones'
  ];
  
  dataSource = new MatTableDataSource<Domains>();
  
  constructor(private domainService: DomainsService, public dialog: MatDialog){
    this.getDomains()
  }
  
  getDomains(){
    this.domainService.getDomains().subscribe((data: any) => {
      this.domains = data;
      this.isLoading = false
      this.dataSource.data = data
      console.log("Domains", this.dataSource.data)
    })
  }

  openDialog(id:number){
    const result: any[] = this.domains.filter((domain:any) => domain.id === id);
    this.dialog.open(SeeComponent, { 
      data: result[0]
    }) 
  }
  openEdit(id:number){
    const result: any[] = this.domains.filter((domain:any) => domain.id === id);
    this.dialog.open(EditComponent, { 
      data: result[0]
    }) 
  }
  openDelete(id:number){
    const result: any[] = this.domains.filter((domain:any) => domain.id === id);
    this.dialog.open(DeleteComponent, { 
      data: result[0]
    }) 
  }



  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
