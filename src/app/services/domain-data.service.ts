import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainDataService {
  private domainData: any;
  
  setDomainData(data: any) {
    console.log("DOMAIN:", data);
    this.domainData = data;
  }

  getDomainData() {
    console.log(this.domainData);
    return this.domainData;
  }
}



