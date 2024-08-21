import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { DomainCategory } from 'src/app/interfaces/domaincategory.interface';

@Component({
  selector: 'app-domaincategory',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule
  ],
  templateUrl: './domaincategory.component.html'
})
export class DomaincategoryComponent {
  domainCategoryForm : FormGroup

  constructor(private dialogRef: MatDialogRef<DomaincategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DomainCategory,
    private fb: FormBuilder) { 
      if(data) {
        this.domainCategoryForm = new FormGroup({
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
    this.dialogRef.close(this.domainCategoryForm.getRawValue());
  }
}
