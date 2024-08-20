import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainDataService {
  private domainData: any;
  
  setDomainData(data: any) {
    this.domainData = data;
  }

  getDomainData() {
    return this.domainData;
  }
}



