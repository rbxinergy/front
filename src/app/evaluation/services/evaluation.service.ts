import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Quest } from '../interfaces/quest.interface';
import { Evaluation } from '../interfaces/evaluation.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  headers!: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  sessionStorage.getItem('token'),
      'Cache-Control': 'no-cache'
    });
  }

  getEvaluationsByCompanyId(id: number): Observable<Evaluation[]> {
    const params = new HttpParams({
      fromString: `id=${id}`
    })
    return this.http.get<Evaluation[]>(environment.apiGetEvaluationsByCompanyId, {headers: this.headers, params})
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  createEvaluation(data: any) {
    return this.http.post(environment.apiCreateEvaluation, data, {headers: this.headers})
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateEvaluation(data: any) {
    return this.http.put(environment.apiPutEvaluation, data, {headers: this.headers})
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
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
