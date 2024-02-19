import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  standalone: true,
  imports:[
    MatSlideToggleModule,
    CommonModule,
  ]
})
export class CompanyComponent {
  constructor(private companyService: CompanyService){}

  companies:any
  checked = false
  
  ngOnInit() {
    this.companyService.getCompanies().subscribe((data: any) => {
      this.companies = data;
      console.log("Companies", data)
    })
  }
}
