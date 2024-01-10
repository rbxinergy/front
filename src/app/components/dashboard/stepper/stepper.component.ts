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
import { ClientService } from 'src/app/shared/services/client.service';

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
    CommonModule
  ],
})
export class StepperComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
  });
  sixthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
  });
  seventhFormGroup = this._formBuilder.group({
    seventhCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private clientService: ClientService) {}
  selected = 'cliente1';
  documento = 'rut';

  showNewUser: boolean = false
  showSelectUser: boolean = false

  showNewRol: boolean = false
  showSelectRol: boolean = false

  newUserChanged($event: {  value: number; }){
    console.log( $event.value);
    if($event.value == 1){
        this.showNewUser = !this.showNewUser;
        this.showSelectUser = false ;
    } else if ($event.value == 2) {
      this.showSelectUser = !this.showSelectUser ;
      this.showNewUser = false;
    }
  }
  newRolChanged($event: {  value: number; }){
    console.log( $event.value);
    if($event.value == 3){
        this.showNewRol = !this.showNewRol;
        this.showSelectRol = false ;
    } else if ($event.value == 4) {
      this.showSelectRol = !this.showSelectRol ;
      this.showNewRol = false;
    }
  }

  show = false
  
  client = ''
  // getData(cliente:string){
  //   cliente= ''
  //   this.client = cliente
  //   console.log(cliente)
  // }
  saveData(paso:number, client:string){
    switch(true){
      case paso == 1: this.clientService
      this.show = true
      this.client = client
      console.log(client)
    }
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
}
