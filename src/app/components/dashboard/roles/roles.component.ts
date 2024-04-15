import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, NgForm, FormControl, FormGroupDirective} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UsersService } from 'src/app/shared/services/users.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Users } from 'src/app/intefaces/users'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  standalone:true,
  imports: [
    MatSlideToggleModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule
  ],
})
export class RolesComponent implements AfterViewInit {
  isLoading= true
  users:Users[] = []

  usersTableColumns: string[] = [
    'name', 'position', 'email', 'companyname', 'acciones'
  ];
  
  dataSource = new MatTableDataSource<Users>();
  
  constructor(private userService: UsersService, public dialog: MatDialog){
    this.getUsers()
  }
  
  getUsers(){
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.isLoading = false
      this.dataSource.data = data
      console.log("Users", this.dataSource.data)
    })
  }
  

  openEdit(id:number){
    const result: any[] = this.users.filter((company:any) => company.id === id);
    this.dialog.open(EditComponent, { 
      data: result[0]
    }) 
  }
  openDelete(id:number){
    const result: any[] = this.users.filter((company:any) => company.id === id);
    this.dialog.open(DeleteComponent, { 
      data: result[0]
    }) 
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
