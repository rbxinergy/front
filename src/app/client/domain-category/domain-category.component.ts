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

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });

  }

  saveDomainCategory() {
    if (this.form.valid) {
      this.dialog.open(MessagesModalComponent, {
        data: {
          message: 'Se ha creado una nueva categoría de dominio.',
          buttonText: 'Aceptar',
          showCancel: true,
          type: 'success'
        }
      });
      
    }
  }
}