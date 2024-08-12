import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubdomainDataService {
  private subdomainData: any;
  
  setDomainData(data: any) {
    console.log("DOMAIN:", data);
    this.subdomainData = data;
  }

  getDomainData() {
    console.log(this.subdomainData);
    return this.subdomainData;
  }
}
