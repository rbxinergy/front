import { Component, Inject, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { rutValidator } from 'src/app/shared/rut.validator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MessagesModalComponent } from '../../components/messages-modal/messages-modal.component';
import { ClientService } from '../services/client.service';
import { ClientDataService } from '../services/client-data.service';
import { LoadingOverlayComponent } from '../../components/loading-overlay/loading-overlay.component';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    LoadingOverlayComponent
  ],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss'
})
export class NewClientComponent {
  clientForm: FormGroup;
  hasError = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog,
    private clientService: ClientService, private clientDataService: ClientDataService,
    @Inject(MatStepper) private stepper: MatStepper
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
      let data = this.clientForm.value;
      this.isLoading = true;
      data.idContact = [];
      this.clientService.createClient(data).subscribe({
        next: (data) => {
          this.clientDataService.setClientData(data.body);
          this.dialog.open(MessagesModalComponent, {
            width: '600px',
            height: '400px',
            data: {
              message: 'Se ha creado un nuevo cliente.',
              buttonText: 'Aceptar',
              showCancel: false,
              type: 'success'
            },
          });
          this.clientForm.disable();
          this.stepper.next();
        },
        error: () => {
          this.dialog.open(MessagesModalComponent, {
            width: '600px',
            height: '400px',
            data: {
              message: 'Error al crear el cliente.',
              buttonText: 'Aceptar',
              showCancel: false,
              type: 'error'
            },
          });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}