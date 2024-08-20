import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubdomainDataService {
  private subdomainData: any;
  
  setSubdomainData(data: any) {
    this.subdomainData = data;
  }

  getSubdomainData() {
    return this.subdomainData;
  }
}
