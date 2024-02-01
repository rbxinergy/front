import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, NgForm, FormControl, FormGroupDirective} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  standalone:true,
  imports: [MatSlideToggleModule],
})
export class RolesComponent {
  
  constructor(private _formBuilder: FormBuilder) {}
}
