import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private clientData: any;

  setClientData(data: any) {
    console.log("CLIENT:", data);
    this.clientData = data;
  }

  getClientData() {
    console.log(this.clientData);
    return this.clientData;
  }
}
