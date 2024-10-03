import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { rutValidator } from 'src/app/shared/rut.validator';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MessagesModalComponent } from '../../components/messages-modal/messages-modal.component';


@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss'
})
export class NewClientComponent {
  clientForm: FormGroup;
  hasError = false;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<NewClientComponent>,
    private dialog: MatDialog
  ) {
    this.clientForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      businessName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      county: new FormControl(''),
      documentType: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      district: new FormControl(''),
      tag: new FormControl('')
    });

    this.clientForm.get('documentType')?.valueChanges.subscribe((value: string) => {
      if (value === 'RUT') {
        this.clientForm.get('document')?.setValidators([Validators.required, rutValidator()]);
      } else {
        this.clientForm.get('document')?.clearValidators();
      }
      this.clientForm.get('document')?.updateValueAndValidity();
    });
  }

  saveClient() {
    if (this.clientForm.valid) {
      const modalRef = this.dialog.open(MessagesModalComponent, {
        data: {
          message: 'Se ha creado un nuevo cliente.',
          buttonText: 'Aceptar',
          showCancel: true,
          type: 'success'
        }
      });
      modalRef.afterClosed().subscribe(result => {
        this.dialogRef.close();
      });
    }
  }
}