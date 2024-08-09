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
    return {
      "id": "6ddce5de-9b50-49cc-9e53-9a6dbdb74c2c",
      "name": "clientrick39",
      "businessName": "clientrick39",
      "address": "",
      "country": "clientrick39",
      "county": "clientrick39",
      "city": "clientrick39",
      "state": "clientrick39",
      "district": "clientrick39",
      "documentType": "clientrick39",
      "document": "clientrick39",
      "tag": "clientrick39",
      "active": true,
      "createdDate": "2024-08-04T20:58:18.890+00:00",
      "modificatedDate": null,
      "idContact": []
  }
  }
}
