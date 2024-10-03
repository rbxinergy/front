import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from 'src/app/shared/services/users.service';
import { CompanyService } from 'src/app/services/company.service';
import { ClientDataService } from '../../../../services/client-data.service';
// import { Companies } from 'src/app/interfaces/companies';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
})


export class UsersComponent implements OnInit {

  usersForm = new FormGroup({
    firstName: new FormControl('', Validators.minLength(2)),
    lastName: new FormControl('', Validators.minLength(2)),
    position: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    rolId: new FormControl('', Validators.required),
    companyId: new FormControl('', Validators.required),
  })
  
  showTable = false
  
  constructor(private _formBuilder: FormBuilder, private userService: UsersService,
    private companyService: CompanyService, private clientDataService: ClientDataService) {}
  
  companies:any
  roles:any
  users:any

  async addUser(){
    this.showTable = true

    const form = this.usersForm.value 
    await this.userService.postUser(form)

    return new Promise((resolve) => {
      
      this.userService.getUsersRoles().subscribe(data => {
        this.users = data.usersRoles
      })
    })

  }

  getCompaniesByGrp(){
    const client = this.clientDataService.getClientData()
    this.companyService.getCompaniesByClient(client).subscribe(async data => {
      this.companies = data
    })
  }

  ngOnInit() {
    this.userService.getRoles().subscribe(data => {
      this.roles = data;
    })
  }
}
