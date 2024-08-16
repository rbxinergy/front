import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceCategory } from 'src/app/interfaces/servicecategory.interface'

@Component({
  selector: 'app-servicecategory',
  templateUrl: './servicecategory.component.html',
  styleUrls: ['./servicecategory.component.css'],
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatDatepickerModule, MatNativeDateModule
  ]
})
export class ServicecategoryComponent {
  serviceCategoryForm : FormGroup

  constructor(private dialogRef: MatDialogRef<ServicecategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceCategory,
    private fb: FormBuilder) { 
      if(data) {
        this.serviceCategoryForm = new FormGroup({
          id: new FormControl(data?.id || null, Validators.required),
          name: new FormControl(data?.name || ''),
          description: new FormControl(data?.description || '', Validators.required),
          active: new FormControl(data?.active || true),
          tag: new FormControl(data?.tag || ''),
          idGroupCompany: new FormControl(data?.idGroupCompany || null, Validators.required),
        });
      }
    }

  save() {
    this.dialogRef.close(this.serviceCategoryForm.getRawValue());
  }

}


