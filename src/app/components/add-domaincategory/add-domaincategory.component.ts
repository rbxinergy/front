import { Component } from '@angular/core';
import { DomainCategoryTableComponent } from "../domain-category-table/domain-category-table.component";
import { GroupcompanyDataService } from 'src/app/services/groupcompany-data.service';
import { GroupCompany } from 'src/app/interfaces/groupcompany.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client.interface';

interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: 'app-add-domaincategory',
  templateUrl: './add-domaincategory.component.html',
  styleUrls: ['./add-domaincategory.component.css'],
  standalone: true,
  imports: [
    DomainCategoryTableComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    MatInputModule,
  ]

})

export class AddDomaincategoryComponent {
  groupCompany: GroupCompany | null = null;
  clients: Client | null = null;

  constructor( private clientService: ClientService, private groupCompanyDataService: GroupcompanyDataService) {

    this.getClients()
    console.log('clientes', this.clients)
    this.groupCompany = this.groupCompanyDataService.getGroupCompanyData();
    console.log("GROUPCOMPANY: ", this.groupCompany)
    // this.domainCategoryService.getDomainCategories().subscribe((domainCategories: DomainCategory[]) => {
    //   this.dataSource.data = domainCategories;
    //   console.log(domainCategories)
    // });
  }
  getClients(){
    this.clientService.getClients().subscribe((data: any) => {
      // this.isLoading = true;
      this.clients = data;
      console.log(this.clients)
      // this.dataSource.data = data
      // this.isLoading = false;
    })
  }

  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];

}
