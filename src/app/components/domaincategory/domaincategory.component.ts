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
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-domaincategory',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    MatNativeDateModule, MatDatepickerModule
  ],
  templateUrl: './domaincategory.component.html',
  styleUrls: ['./domaincategory.component.css']
})
export class DomaincategoryComponent {
  domainCategoryForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    is_active: new FormControl(true),
    is_delete: new FormControl(false),
    created_date: new FormControl(new Date(), Validators.required),
    modificated_date: new FormControl(new Date(), Validators.required),
    tag: new FormControl(''),
    id_group_company: new FormControl(null, Validators.required),
  });
}
