import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators,  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  standalone:true,
  imports:[
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatButtonModule
  ]
})
export class EditComponent {
  clients: any
  public states = [
    {id: 1, name: "Region de Tarapacá"},
    {id: 2, name: "Región de Antofagasta"},
    {id: 3, name: "Región de Atacama"},
    {id: 4, name: "Región de Coquimbo"},
    {id: 5, name: "Región de Valparaíso"},
    {id: 6, name: "Región de O`Higgins"},
    {id: 7, name: "Región del Maule"},
    {id: 8, name: "Región del Bío Bío"},
    {id: 9, name: "Región de la Araucanía"},
    {id: 10, name: "Región de Los Lagos"},
    {id: 11, name: "Región de Aysén"},
    {id: 12, name: "Región de Magallanes"},
    {id: 13, name: "Metropolitana"},
    {id: 14, name: "Región de Los Ríos"},
    {id: 15, name: "Región de Arica y Parinacota"},
    {id: 16, name: "Región de Ñuble"}
  ]
  public cities= [
    {id: 1, name: "Santiago"},
    {id: 2, name: "Valparaíso"},
    {id: 2, name: "Rancagua"}
  ]

  constructor(private companyService: CompanyService, @Inject(MAT_DIALOG_DATA) public data: any){
    console.log(this.data)
    this.clientForm.controls['id'].setValue(this.data.id)
    this.clientForm.controls['name'].setValue(this.data.companyname)
    this.clientForm.controls['phone'].setValue(this.data.phone)
    this.clientForm.controls['address'].setValue(this.data.address)
    this.clientForm.controls['email'].setValue(this.data.email)
    this.clientForm.controls['cityId'].setValue(this.data.cityId)
    this.clientForm.controls['state'].setValue(this.data.stateId, this.data.statename )
    this.clientForm.controls['countryId'].setValue(this.data.countryId)
  }

  clientForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    cityId: new FormControl('', Validators.required),
    cityname: new FormControl('', Validators.required),
    state: new FormControl({stateId: null, statename:''}, Validators.required),
    countryId: new FormControl('', Validators.required),
  })

  compareObjects(data: any, states: any ){
    console.log(data.statename, states.name)
    if(data.statename === states.name && data.stateId === states.id )
    return true
    else return false
  }
  compareWith(obj1: any, obj2: any ): boolean{
    console.log(obj1.stateId,  obj2.id, obj1.statename, obj2.name)
    return obj1 && obj2? obj1.stateId === obj2.id : obj1 === obj2
  }
  // Formulario para editar datos de clientes
  onClientEdit(){
    const form = this.clientForm.value
    console.log(form)
    this.companyService.putClient(form).subscribe((data: any) => {
      this.clients = data;
    })
  }
}

