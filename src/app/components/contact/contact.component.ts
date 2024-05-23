import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule} from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule
  ],
})
export class ContactComponent {
  contactForm = new FormGroup({
    id: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    last_name: new FormControl('',Validators.required),
    surname: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl(''),
    cellphone: new FormControl(''),
    job_title: new FormControl(''),
    contact_type: new FormControl(''),
    is_active: new FormControl(''),
    is_delete: new FormControl(''),
    created_date:new FormControl(''),
    modificated_date: new FormControl(''),
    tag: new FormControl('')
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    const formData = this.contactForm.value;
    // Implementar lógica para enviar o actualizar los datos del formulario
    console.log(formData);
  }

  onCancel() {
    // Implementar lógica para cancelar si es necesario
  }
}
