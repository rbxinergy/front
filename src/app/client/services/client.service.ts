import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/client.interface';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  constructor(private http: HttpClient) {  }

  token = sessionStorage.getItem('token')
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  });
  apiUrl = environment.apiUrls.client;
  serverUrl = environment.serverUrl;

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  createClient(form: any): Observable<HttpResponse<Client>>{
    return  this.http.post<Client>(`${this.serverUrl}${this.apiUrl}/create`, form, { headers: this.headers, observe: 'response' });
  }
  
  uploadCSV(formData: FormData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': 'Bearer ' +  this.token,
      'cache-control': 'no-cache'
    });
    return this.http.post(`${this.serverUrl}${this.apiUrl}/create/upload/file`, formData, { headers, observe: 'response'});
  }

  updateClient(client: Client): Observable<HttpResponse<any>> {
    console.log(client)
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/update/${client.id}`, client, { headers: this.headers, observe: 'response' });
  }

  getClients(): Observable<HttpResponse<Client[]>> {
    // return this.http.get<Client[]>(`${this.serverUrl}${this.apiUrl}/get/all`, { headers: this.headers, observe: 'response'})
    const dataDummy = [
        {
          "id": "550e8400-e29b-41d4-a716-446655440001",
          "name": "Santander Chile",
          "businessName": "Banco Santander Chile",
          "address": "Bandera 140, Santiago, Chile",
          "country": "Chile",
          "county": "Santiago",
          "city": "Santiago",
          "district": "Santiago Centro",
          "state": "Región Metropolitana",
          "documentType": "RUT",
          "document": "97.036.000-K",
          "tag": "banking",
          "active": true,
          "createdDate": "2023-10-01 10:00:00.000",
          "modificatedDate": "2023-10-01 10:00:00.000",
          "idContact": [
            "550e8400-e29b-41d4-a716-446655440002"
          ]
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440003",
          "name": "Santander Consumer Chile",
          "businessName": "Santander Consumer Chile S.A.",
          "address": "Avenida Providencia 1760, Santiago, Chile",
          "country": "Chile",
          "county": "Santiago",
          "city": "Santiago",
          "district": "Providencia",
          "state": "Región Metropolitana",
          "documentType": "RUT",
          "document": "76.123.456-7",
          "tag": "consumer-finance",
          "active": true,
          "createdDate": "2023-10-01 10:00:00.000",
          "modificatedDate": "2023-10-01 10:00:00.000",
          "idContact": [
            "550e8400-e29b-41d4-a716-446655440004"
          ]
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440005",
          "name": "Santander Corredores de Bolsa",
          "businessName": "Santander Corredores de Bolsa Limitada",
          "address": "Bandera 140, Santiago, Chile",
          "country": "Chile",
          "county": "Santiago",
          "city": "Santiago",
          "district": "Santiago Centro",
          "state": "Región Metropolitana",
          "documentType": "RUT",
          "document": "96.789.123-4",
          "tag": "brokerage",
          "active": true,
          "createdDate": "2023-10-01 10:00:00.000",
          "modificatedDate": "2023-10-01 10:00:00.000",
          "idContact": [
            "550e8400-e29b-41d4-a716-446655440006"
          ]
        }
    ]
    return of(new HttpResponse({ body: dataDummy }));
  }

  getClient(client: string): Observable<HttpResponse<Client>> {
    return this.http.get<Client>(`${this.serverUrl}${this.apiUrl}/get/${client}`, { headers: this.headers, observe: 'response'})
  }

  deleteClient(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/${id}`, { observe: 'response' });
  }

  deleteClientCascade(id: string){
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/cascade/${id}`, { observe: 'response' });
  }

}
