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
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
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
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/update/${client.id}`, client, { headers: this.headers, observe: 'response' });
  }

  getClients(): Observable<HttpResponse<Client[]>> {
    return this.http.get<Client[]>(`${this.serverUrl}${this.apiUrl}/get/all`, { headers: this.headers, observe: 'response'})
  }

  getClient(client: string): Observable<HttpResponse<Client>> {
    return this.http.get<Client>(`${this.serverUrl}${this.apiUrl}/get/${client}`, { headers: this.headers, observe: 'response'})
  }

  deleteClient(id: string, cascade: boolean = false): Observable<HttpResponse<any>> {
    const url = cascade ? `${this.serverUrl}${this.apiUrl}/delete/cascade/${id}` : `${this.serverUrl}${this.apiUrl}/delete/${id}`;
    return this.http.delete<any>(url, { headers: this.headers, observe: 'response' }); 
  }
}
