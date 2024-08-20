import { Injectable } from '@angular/core';
import { GroupCompany } from '../interfaces/groupcompany.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupcompanyDataService {
  private groupcompanyData: GroupCompany;

  setGroupCompanyData(data: GroupCompany) {
    this.groupcompanyData = data;
  }

  getGroupCompanyData(): GroupCompany {
    return this.groupcompanyData;
  }
}
