import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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

  // async getClient():Promise<any>{
  //   const url = 'https://get-clients-ehqivncgha-uc.a.run.app/get-clients/api/get-clients'
  //   const getClient = this.http.get<any>(url, { headers: this.headers })
  //   return await lastValueFrom(getClient)  
  // }
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

  saveClient(form: any): Observable<HttpResponse<Client>>{
    // this.getClient()
    const apiUrl = environment.apiUrls.client
    const serverUrl = environment.serverUrl

    return this.http.post<Client>(`${serverUrl}${apiUrl}/create`, form, { headers: this.headers, observe: 'response' });
    // guardo el documentNumber y se lo paso al domains.service para poder guardar el postDomain
    // const id = form.documentNumber
    // console.log(id)
    // sessionStorage.setItem('groupDocument', id)
  

    // const postClient = this.http.post<any>(url, body, { headers: this.headers }).pipe(
    //   catchError(this.handleError)
    // );

    // return await lastValueFrom(postClient)  
  
  }
 


}
