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
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-groupcompany',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule
  ],
  templateUrl: './groupcompany.component.html',
  styleUrls: ['./groupcompany.component.css']
})
export class GroupcompanyComponent {
  groupCompanyForm = new FormGroup({
    id: new FormControl(this.data?.id || null, Validators.required),
    name: new FormControl(this.data?.name || '', Validators.required),
    description: new FormControl(this.data?.description || '', Validators.required),
    tag: new FormControl(this.data?.tag || ''),
    active: new FormControl(this.data?.active || true),
    idClient: new FormControl(this.data?.idClient || null, Validators.required),
  });

  constructor(private dialogRef: MatDialogRef<GroupcompanyComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  save() {
    this.dialogRef.close(this.groupCompanyForm.getRawValue());
  }
}
