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
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-servicecompany',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule
  ],
  templateUrl: './servicecompany.component.html',
  styleUrls: ['./servicecompany.component.css']
})
export class ServicecompanyComponent {
  serviceCompanyForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    is_active: new FormControl(true),
    is_delete: new FormControl(false),
    created_date: new FormControl(new Date(), Validators.required),
    modificated_date: new FormControl(new Date(), Validators.required),
    tag: new FormControl(''),
    id_service_category: new FormControl(null, Validators.required),
    id_domain: new FormControl(null, Validators.required),
    id_company: new FormControl(null, Validators.required),
  });

  serviceCategories: any[] = [];
  domains: any[] = [];
  companies: any[] = [];

  constructor() {

  }
}
