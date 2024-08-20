import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, throwError } from 'rxjs';
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
  })
  apiUrl = environment.apiUrls.client
  serverUrl = environment.serverUrl

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

  uploadClients(client: Client): Observable<HttpResponse<any>> {
    console.log(client)
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/create/upload/file`, client, { observe: 'response' });
  }
  getClients() {
   return this.http.get<Client[]>(`${this.serverUrl}${this.apiUrl}/get/all`, { headers: this.headers})
  }
  updateClient(client: Client): Observable<HttpResponse<any>> {
    console.log(client)
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/update`, client, { observe: 'response' });
  }

  deleteClient(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/${id}`, { observe: 'response' });
  }
}
