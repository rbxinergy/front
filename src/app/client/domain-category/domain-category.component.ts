import { Component, Inject, Optional } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { rutValidator } from 'src/app/shared/rut.validator';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MessagesModalComponent } from '../../components/messages-modal/messages-modal.component';


@Component({
  selector: 'app-domain-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './domain-category.component.html',
  styleUrl: './domain-category.component.scss',
})
export class DomainCategoryComponent {
  form: FormGroup;
  hasError = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private dialogRef: MatDialogRef<DomainCategoryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      id: new FormControl(this.data?.id),
      name: new FormControl(this.data?.name, [Validators.required]),
      tag: new FormControl(this.data?.tag, [Validators.required]),
      description: new FormControl(this.data?.description)
    });

  }

  saveDomainCategory() {
    if (this.form.valid) {
      this.dialogRef.close({...this.form.value, id: this.data?.id});
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
