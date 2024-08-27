import { Injectable } from '@angular/core';
import { Company } from '../company/interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {
  private companyData: Company;

  setGroupCompanyData(data: Company) {
    this.companyData = data;
  }

  getGroupCompanyData(): Company {
    return this.companyData;
  }
}

