import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private clientData: Client;

  setClientData(data: Client) {
    this.clientData = data;
    console.log("SET DATA:", this.clientData);
  }

  getClientData(): Client {
    console.log("GET DATA:", this.clientData);
    return this.clientData;
  }
}
