import { AfterViewInit, Component, ViewChild, Inject} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { CompanyService } from 'src/app/shared/services/company.service';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Clients } from 'src/app/intefaces/clients'
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EditComponent } from './edit/edit.component';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete.component';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatButtonModule, 
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    TranslateModule,
    MatButtonModule,
    EditComponent,
    MatDialogModule,
    MatDividerModule
  ],
})
export class ClientsComponent implements AfterViewInit {
  isLoading = true
  companies:Clients[] = []
  checked = false
  companiesTableColumns: string[] = [
    'companyname', 'documentNumber', 'status', 'acciones'
  ];

  dataSource = new MatTableDataSource<Clients>();
  
  constructor(private companyService: CompanyService, public dialog: MatDialog){
    this.getClients()
  }

  openDialog(id: number){
    const result: any[] = this.companies.filter((company:any) => company.id === id);
    this.dialog.open(EditComponent, { 
      data: result[0]
    }) 
  }
  openDelete(id: number){
    const result: any[] = this.companies.filter((company:any) => company.id === id);
    this.dialog.open(DeleteComponent, { 
      data: result[0]
    }) 
  }

  // trae arreglo con clientes 
  getClients(){
    this.companyService.getClients().subscribe((data: any) => {
      this.isLoading = true;
      this.companies = data;
      this.dataSource.data = data
      this.isLoading = false;
      console.log(data)
    })
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
