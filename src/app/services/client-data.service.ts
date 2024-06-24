import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private clientData: Client;

  setClientData(data: Client) {
    console.log("CLIENT:", data);
    this.clientData = data;
  }

  getClientData(): Client {
    console.log(this.clientData);
    return this.clientData;
  }
}
