import { Component, OnInit } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { CompanyService } from 'src/app/shared/services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatButtonModule, 
    CommonModule
  ],
})
export class ClientsComponent implements OnInit{

  constructor(private companyService: CompanyService){}

  companies:any
  checked = false
  
  ngOnInit() {
    this.companyService.getClients().subscribe((data: any) => {
      this.companies = data;
      console.log("Companies", data)
    })
  }



}
