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

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  standalone:true,
  imports: [
    MatSlideToggleModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule
  ],
})
export class RolesComponent implements AfterViewInit {

  users:Users[] = []

  usersTableColumns: string[] = [
    'name', 'position', 'email', 'companyname', 'acciones'
  ];
  
  dataSource = new MatTableDataSource<Users>();
  
  constructor(private userService: UsersService){
    this.getUsers()
  }
  
  getUsers(){
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.dataSource.data = data
      console.log("Users", this.dataSource.data)
    })
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  // constructor(private _formBuilder: FormBuilder, private userService: UsersService) {}

  // users: any

  // ngOnInit() {
  //   this.userService.getUsers().subscribe((data: any) => {
  //     this.users = data
  //     console.log(this.users)
  //   })
  // }

}
