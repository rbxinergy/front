import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, NgForm, FormControl, FormGroupDirective} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  standalone:true,
  imports: [
    MatSlideToggleModule,
    CommonModule
  ],
})
export class RolesComponent {
  
  constructor(private _formBuilder: FormBuilder, private userService: UsersService) {}

  users: any

  ngOnInit() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data
      console.log(this.users)
    })
  }

}
