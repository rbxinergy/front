import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-contact-service-company',
  templateUrl: './contact-service-company.component.html',
  styleUrls: ['./contact-service-company.component.css'],
  standalone:true,
  imports:[
    MatFormFieldModule, FormsModule
  ]
})
export class ContactServiceCompanyComponent implements OnInit{
  contactForm?: FormGroup;

  constructor(fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      // idContact: new FormControl('', [Validators.required, Validators.number]),
      // idServiceCompany: new FormControl('', [Validators.required, Validators.number]),
    });
  }

  onSubmit(): void {
    // Implementar la lógica para enviar el formulario
    console.log('Formulario enviado:', this.contactForm.value);
  }
}
