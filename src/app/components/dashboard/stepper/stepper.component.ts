import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, NgForm, FormControl, FormGroupDirective} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ClientComponent } from './client/client.component';
import { DomainsComponent } from './domains/domains.component';
import { CompanyComponent } from './company/company.component';
import { UsersComponent } from './users/users.component';
import { TranslateModule } from '@ngx-translate/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatRadioModule,
    CommonModule, 
    ClientComponent,
    DomainsComponent,
    CompanyComponent,
    UsersComponent,
    TranslateModule
  ],

})
export class StepperComponent {

  clientForm = this._formBuilder.group({
    client: ['', Validators.required],
  });
  companyForm = this._formBuilder.group({
    domain: ['', Validators.required],
  });
  domainsForm = this._formBuilder.group({
    company: ['', Validators.required],
  });
  usersForm = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });

  isLinear = false;

  constructor(private _formBuilder: FormBuilder ) {}

}
