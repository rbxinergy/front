import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Quest, Question } from '../interfaces/quest.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QuestService {
  private headers!: HttpHeaders;

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  token,
      'Cache-Control': 'no-cache'
    });
  }

  getQuestionnaires(id: number): Observable<Quest[]> {
    const params = new HttpParams({
      fromString: `id=${id}`
    })
    return this.http.get<Quest[]>(environment.apiGetQuestByCompany, {headers: this.headers, params});
  }

  createQuestionnaire(data: Quest) {
    const url = environment.apiCreateQuestionnaire;
    return this.http.post(url, data, {headers: this.headers}).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  createQuestion(data:any): Observable<Quest> {
    const url = environment.apiPostQuestion;
    return this.http.post<Quest>(url, data, {headers: this.headers}).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }
  createQuestQuestion(data:any) {
    const url = environment.apiCreateQuestQuestion;
    return this.http.post(url, data, {headers: this.headers}).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  getQuestByQuestId(id: number) {
    const url = environment.apiGetQuestionsByQuestId;
    const params = new HttpParams({
      fromString: `id=${id}`
    });
    return this.http.get<Quest>(url, {headers: this.headers, params}).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getQuestionsByQuestId(id: number) {
    const url = environment.apiGetQuestionsByQuestId;
    const params = new HttpParams({
      fromString: `id=${id}`
    });
    return this.http.get<Quest>(url, {headers: this.headers, params}).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getQuestionsByCompanyId(id: number) {
    const url = environment.apiGetQuestionsByCompanyId;
    const params = new HttpParams({
      fromString: `id=${id}`
    });
    return this.http.get<Question[]>(url, {headers: this.headers, params}).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getQuestionsByEvalId(id: number) {
    const url = environment.apiGetQuestByEvalId;
    const params = new HttpParams({
      fromString: `id=${id}`
    });
    return this.http.get<Quest[]>(url, {headers: this.headers, params}).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  setQuestionsOrder(quest: Question[]) {
    const url = environment.apiSetQuestionsOrder;
    return this.http.post<Quest>(url, quest, {headers: this.headers}).pipe(
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
