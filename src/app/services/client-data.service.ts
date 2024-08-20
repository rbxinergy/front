import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private clientData: Client;

  setClientData(data: Client) {
    this.clientData = data;
  }

  getClientData(): Client {
    return this.clientData;
  }
}
