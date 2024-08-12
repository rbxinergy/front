import { Injectable } from '@angular/core';
import { GroupCompany } from '../interfaces/groupcompany.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupcompanyDataService {
  private groupcompanyData: GroupCompany;

  setGroupCompanyData(data: GroupCompany) {
    console.log("GROUPCOMPANY:", data);
    this.groupcompanyData = data;
  }

  getGroupCompanyData(): GroupCompany {
    console.log(this.groupcompanyData);
    return this.groupcompanyData;
  }
}
