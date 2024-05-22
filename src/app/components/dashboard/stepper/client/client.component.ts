import { Component, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/shared/services/client.service';
import { MyErrorStateMatcher } from '../stepper.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  
} from '@angular/material/dialog';




@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  standalone: true,
  imports:[
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ClientComponent {

  get clientName(){
    return this.clientForm.get('clientName') as FormControl
  }

  clientForm = new FormGroup({
    clientName: new FormControl('', Validators.minLength(2)),
    name: new FormControl('', Validators.minLength(2)),
    documentType: new FormControl('', Validators.required),
    documentNumber: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    groupDocument: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    cityId: new FormControl('', Validators.required),
    stateId: new FormControl('', Validators.required),
    countryId: new FormControl('', Validators.required),
  })

  @Input ()

  firstFormGroup = this._formBuilder.group({
    client: ['', Validators.required],
  });
  cliente!: string | null | undefined;

  show = false

  selectedValue: string = '';
  selectedCountry: number = 0
  selectedState: number = 0
  selectedCity: number = 0

  onClientCreate(){
    const form = this.clientForm.value
    this.clientService.saveClient(form)
  }

  constructor(private _formBuilder: FormBuilder, private clientService: ClientService ) {}
  


}