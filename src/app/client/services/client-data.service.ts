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
    //return this.clientData;
    return {
      "id": "6b84652c-ba34-4d74-bf75-810ebc92b627",
      "name": "Cliente 20241009 2",
      "businessName": "Testing SA 2",
      "address": "Calle con hoyos 123",
      "country": "Chile",
      "county": "Región Metropolitana",
      "city": "Santiago",
      "state": "Santiago",
      "district": "Santiago",
      "documentType": "RUT",
      "document": "84778713-9",
      "active": true,
      "tag": "",
      "createdDate": "2024-10-09T13:56:23.462+00:00",
      "modificatedDate": null,
      "idContact": []
    }
  }
}
