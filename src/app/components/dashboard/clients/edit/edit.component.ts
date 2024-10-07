import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators,  ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClientsComponent } from '../clients.component';
import { Client } from 'src/app/interfaces/client.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  standalone:true,
  imports:[
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule, 
    MatDividerModule, 
    MatRadioModule, 
    TranslateModule,
    MatNativeDateModule, MatDatepickerModule
  ]
})
export class EditComponent {
  clients: any
  clientForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private fb: FormBuilder) {
      if(data) {
        this.clientForm = new FormGroup({
          id: new FormControl(data?.id || '', Validators.required),
          name: new FormControl(data?.name || '', Validators.required),
          businessName: new FormControl(data?.businessName || '', Validators.required),
          address: new FormControl(data?.address || '', Validators.required),
          country: new FormControl(data?.country || '', Validators.required),
          city: new FormControl(data?.city || '', Validators.required),
          state: new FormControl(data?.state || '', Validators.required),
          county: new FormControl(data?.county || ''),
          district: new FormControl(data?.district || ''),
          documentType: new FormControl(data?.documentType || '', Validators.required),
          document: new FormControl(data?.document || '', Validators.required),
          tag: new FormControl(data?.tag || ''),
          createdDate: new FormControl(data?.createdDate || null),
          modificatedDate: new FormControl(data?.modificatedDate || null),
          idContact: new FormControl(data?.idContact || [], Validators.required)
        });
      }
    }

  closeModal() {
    this.dialogRef.close(this.clientForm.getRawValue());
  }
}

