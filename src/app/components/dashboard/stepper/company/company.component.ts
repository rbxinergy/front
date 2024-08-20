import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MyErrorStateMatcher } from '../stepper.component';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  standalone:true,
  imports:[
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule, 
  ]
})



export class CompanyComponent {

  showTable = false
  show = false
  documentType: string = '';
  selectedCountry: number = 0
  selectedState: number = 0
  selectedCity: number = 0


  companyForm = new FormGroup({
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

  companyGroup:any
  // async onCompanyCreate(){
  //   this.show = true
  //   const form = this.companyForm.value
  //   form.groupDocument = sessionStorage.getItem('groupDocument')
  //   console.log(this.companyForm.value)
  //   // await this.companyService.saveCompany(form)

  //   return new Promise((resolve) => {
  //     this.companyService.getCompaniesByClient(sessionStorage.getItem('client')).subscribe(data => {
  //       this.showTable = true
  //       this.companyGroup = data
  //       console.log(this.companyGroup)
  //       console.log(data)
  //     })
  //   })
  // }

  constructor(private companyService: CompanyService) {}
}
