import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { ClientDataService } from 'src/app/services/client-data.service';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';
import { rutValidator } from '../../shared/rut.validator';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule, MatDialogModule
  ],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientForm: FormGroup;
  @Output() validationStatus = new EventEmitter<boolean>();
  @Input() showSaveBtn = true;
  btnDisabled = false;

  constructor(private clientDataService: ClientDataService, private clientService: ClientService,
    private fb: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      businessName: ['', Validators.required],
      documentType: ['', Validators.required],
      document: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      county: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      tag: ['']
    });

    this.clientForm.get('documentType')?.valueChanges.subscribe(value => {
      if (value === 'RUT') {
        this.clientForm.get('document')?.setValidators([Validators.required, rutValidator()]);
      } else {
        this.clientForm.get('document')?.clearValidators();
      }
      this.clientForm.get('document')?.updateValueAndValidity();
    });


    this.clientForm.statusChanges.subscribe(status => {
      this.validationStatus.emit(status === 'VALID'? true : false);
    });
  }

  save() {
    this.clientService.createClient(this.clientForm.getRawValue() as unknown as Client).subscribe({
      next: (response) => {
        this.btnDisabled = true;
        if (response.status === 200) {
          this.clientDataService.setClientData(response.body);
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Cliente creado exitosamente.', type: 'success' }
          });
        } else {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Error al crear el cliente.', type: 'error' }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Error al crear el cliente.', type: 'error' }
        });
      }
    });
  }

}
