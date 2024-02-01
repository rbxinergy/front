import { Component } from '@angular/core';
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



export class UsersComponent {

  usersForm = new FormGroup({
    name: new FormControl('', Validators.minLength(2)),
    jobTitle: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
  })

  roles = [
    {'id':1, 'name': 'Administrador'},
    {'id':2, 'name': 'Operador'},
    {'id':3, 'name': 'ClientManager'},
    {'id':4, 'name': 'companyManager'}
  ]
  companies = [
    {'id':1, 'name': 'Grupo Falabella'},
    {'id':2, 'name': 'Falabella'},
  ]

  company = ''
  document = null
  country = ''
  city = ''
  showTable = false

  addUser(){
    this.showTable = true
  }


  constructor(private _formBuilder: FormBuilder) {}

}
