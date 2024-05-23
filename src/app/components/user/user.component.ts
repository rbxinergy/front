import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    job_title: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    document_type: new FormControl('', Validators.required),
    document: new FormControl('', Validators.required),
    passwd: new FormControl('', Validators.required),
    is_provider: new FormControl(false),
    is_client: new FormControl(false),
    is_user_company: new FormControl(false),
    is_active: new FormControl(true),
    is_delete: new FormControl(false),
    created_date: new FormControl(new Date(), Validators.required),
    modificated_date: new FormControl(new Date(), Validators.required),
    tag: new FormControl(''),
  });
}
