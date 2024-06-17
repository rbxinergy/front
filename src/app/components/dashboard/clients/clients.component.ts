import { AfterViewInit, Component, ViewChild, Inject} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { CompanyService } from 'src/app/services/company.service';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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
import { Client } from '../../../intefaces/client.interface'
import { Router } from '@angular/router';

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
  clients: Client[] = []
  checked = false
  clientsTableColumns: string[] = [
    'name', 'businessName', 'address', 'country', 'documentType', 'document', 'acciones'
  ];

  dataSource = new MatTableDataSource<Client>();
  
  constructor(private companyService: CompanyService, public dialog: MatDialog, private router: Router){
    this.getClients()
  }

  openDialog(id: string){
    const result: any[] = this.clients.filter((client:any) => client.id === id);
    this.dialog.open(EditComponent, { 
      data: result[0]
    }) 
  }
  openDelete(id: string){
    const result: any[] = this.clients.filter((client:any) => client.id === id);
    this.dialog.open(DeleteComponent, { 
      data: result[0]
    }) 
  }

  // trae arreglo con clientes 
  getClients(){
    this.companyService.getClients().subscribe((data: any) => {
      this.isLoading = true;
      this.clients = data;
      this.dataSource.data = data
      this.isLoading = false;
      console.log(data)
    })
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  navigateToNewClient() {
    this.router.navigate(['/new-client']);
  }
}
