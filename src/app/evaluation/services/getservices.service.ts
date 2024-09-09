import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Services } from '../interfaces/services.interface';


@Injectable({
  providedIn: 'root'
})
export class GetservicesService {

  headers!: HttpHeaders;
  param!: HttpParams;

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  token,
      'Cache-Control': 'no-cache'
    });
  }

  getData(groupDocument: string): Observable<Services[]> {
    const params = new HttpParams({
      fromString: `groupDocument=${groupDocument}`
    })
    return this.http.get<Services[]>(environment.apiGetServices, {headers: this.headers, params})
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getDataByCompanyId(companyId: number) {
    
    const params = new HttpParams({
      fromString: `companyId=${companyId}`
    })
    return this.http.get<Services[]>(environment.apiGetServices, {headers: this.headers, params})
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
