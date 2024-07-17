import { Injectable } from '@angular/core';
import { Company } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {
  private companyData: Company;

  setGroupCompanyData(data: Company) {
    console.log("COMPANY:", data);
    this.companyData = data;
  }

  getGroupCompanyData(): Company {
    console.log(this.companyData);
    return this.companyData;
  }
}

