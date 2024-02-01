import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { DomainsService } from 'src/app/shared/services/domains.service';
import { MyErrorStateMatcher } from '../stepper.component';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable } from 'rxjs';
import { ClientService } from 'src/app/shared/services/client.service';
import { MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css'],
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
    MatTableModule
  ]
})


export class DomainsComponent {

  showTable = false
  show = false
  selectedValue: string = '';

  domainsForm = new FormGroup({
    name: new FormControl('', Validators.minLength(2)),
    description: new FormControl('', Validators.required),
    idDomainType: new FormControl('', Validators.required),
    documentGroup: new FormControl('', Validators.required),
  })


  constructor(private _formBuilder: FormBuilder, private domainsService: DomainsService, clientService: ClientService) {}

   
  showDomains(){
// this.domainsService.getDomains().subscribe((data) => {console.log(data)})
// .pipe(map((res) => {
//   const dominios = []
//   for (const key in res){
//     if(res.hasOwnProperty(key)){
//       dominios.push ({...res[key], id: key})
//     }
//   }
//   return dominios
// }))

  }

  // get domainName(){
  //   return this.domainsForm.get('name') as FormControl
  // }
  // get domainescription(){
  //   return this.domainsForm.get('description') as FormControl
  // }
  // get idDomainType(){
  //   return this.domainsForm.get('idDomainType') as FormControl
  // }

  onDomainCreate(){
    this.show = true 
 
    const form = this.domainsForm.value 
    form.documentGroup = sessionStorage.getItem('documentNumber')

    this.domainsService.postDomain(form)

    this.domainsService.getDomainGroup().subscribe(data => {
      this.showTable = true
      this.domainsGroup = data.domains
      console.log(this.domainsGroup)
    })
   
  }
 
  domainsType:any 
  displayedColumns: string[] = [ 'domainName', 'domainDescription', 'typeName'];
  datasource:any
  domainsGroup:any 
  ngOnInit() {
    this.domainsService.getDomainsType().subscribe(data => {
      this.domainsType = data;
      console.log("DomainsType",data)
    })
    // this.domainsService.getDomainGroup().subscribe(data=>{
    //   this.domainsGroup = data.domains
    //   console.log(this.domainsGroup)
    // })
  }

  
}
