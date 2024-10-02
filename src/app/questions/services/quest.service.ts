import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, retry, throwError } from 'rxjs';
import { Quest, Question } from '../interfaces/quest.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  private headers!: HttpHeaders;

  apiGetQuestByCompany = ''; // TODO: change to environment.apiUrls.questionnairesModule
  apiCreateQuestionnaire = ''; // TODO: change to environment.apiUrls.questionnairesModule
  apiCreateQuestQuestion = ''; // TODO: change to environment.apiUrls.questionnairesModule
  apiGetQuestionsByQuestId = ''; // TODO: change to environment.apiUrls.questionnairesModule
  apiGetQuestByEvalId = ''; // TODO: change to environment.apiUrls.questionnairesModule
  apiSetQuestionsOrder = ''; // TODO: change to environment.apiUrls.questionnairesModule

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Cache-Control': 'no-cache',
    });
  }

  getQuestionnaires(id: number): Observable<Quest[]> {
    const params = new HttpParams({
      fromString: `id=${id}`,
    });
    return this.http.get<Quest[]>(this.apiGetQuestByCompany, {
      headers: this.headers,
      params,
    });
  }

  createQuestionnaire(data: Quest) {
    const url = this.apiCreateQuestionnaire;
    return this.http
      .post(url, data, { headers: this.headers })
      .pipe(retry(3), catchError(this.handleError));
  }

  createQuestion(data: any): Observable<any> {
    // const url = environment.apiPostQuestion;
    // return this.http.post<Quest>(url, data, {headers: this.headers}).pipe(
    //   retry(3),
    //   catchError(this.handleError)
    // )
    const response = { status: 200, message: 'Pregunta id 57 creada.-' };
    return of(response);
  }
  createQuestQuestion(data: any) {
    const url = this.apiCreateQuestQuestion;
    return this.http
      .post(url, data, { headers: this.headers })
      .pipe(retry(3), catchError(this.handleError));
  }

  getQuestByQuestId(id: number) {
    const url = this.apiGetQuestionsByQuestId;
    const params = new HttpParams({
      fromString: `id=${id}`,
    });
    return this.http
      .get<Quest>(url, { headers: this.headers, params })
      .pipe(retry(3), catchError(this.handleError));
  }

  getQuestionsByQuestId(id: number) {
    const url = this.apiGetQuestionsByQuestId;
    const params = new HttpParams({
      fromString: `id=${id}`,
    });
    return this.http
      .get<Quest>(url, { headers: this.headers, params })
      .pipe(retry(3), catchError(this.handleError));
  }

  getQuestionsByCompanyId(id: number): Observable<any[]> {
    // const url = environment.apiGetQuestionsByCompanyId;
    // const params = new HttpParams({
    //   fromString: `id=${id}`
    // });
    // return this.http.get<Question[]>(url, {headers: this.headers, params}).pipe(
    //   retry(3),
    //   catchError(this.handleError)
    // );
    const response = [
      {
        id: 1,
        text: 'Pregunta de prueba 1',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 2,
        text: 'Pregunta de prueba 2',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 3,
        text: 'Pregunta de prueba 3',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 4,
        text: 'Pregunta de prueba 4',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 5,
        text: 'Pregunta de prueba 5',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 6,
        text: 'Pregunta de prueba 6',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 7,
        text: 'Pregunta de prueba 7',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 8,
        text: 'Pregunta de prueba 8',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 9,
        text: 'Pregunta de prueba 9',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 10,
        text: 'Pregunta de prueba 10',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 11,
        text: 'Pregunta de prueba 11',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 12,
        text: 'Pregunta de prueba 12',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 13,
        text: 'Pregunta de prueba 13',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 14,
        text: 'Pregunta de prueba 14',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 15,
        text: 'Pregunta de prueba 15',
        type: 'checkbox',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 16,
        text: 'Pregunta de prueba 16',
        type: 'radio',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 17,
        text: 'Pregunta de prueba 17',
        type: 'radio',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 18,
        text: 'Pregunta de prueba 18',
        type: 'radio',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 19,
        text: 'Pregunta de prueba 19',
        type: 'radio',
        version: 1,
        companyId: 27,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 20,
        text: 'Pregunta de prueba 20',
        type: 'text',
        version: 2,
        companyId: 27,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 21,
        text: 'Pregunta de prueba 21',
        type: 'radio',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 22,
        text: 'Pregunta de prueba 22',
        type: 'text',
        version: 2,
        companyId: 27,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 23,
        text: 'Pregunta de prueba 23',
        type: 'radio',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 24,
        text: 'Pregunta de prueba 24',
        type: 'text',
        version: 2,
        companyId: 27,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 25,
        text: 'Pregunta de prueba 25',
        type: 'radio',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 27,
        text: 'Pregunta de prueba 27',
        type: 'text',
        version: 2,
        companyId: 32,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 35,
        text: 'Pregunta de prueba 35',
        type: 'text',
        version: 2,
        companyId: 32,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 40,
        text: 'Pregunta de prueba 40',
        type: 'text',
        version: 1,
        companyId: 32,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 43,
        text: 'Pregunta de prueba 43',
        type: 'text',
        version: 1,
        companyId: 32,
        visibility: true,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 47,
        text: 'Pregunta 20240505-2',
        type: 'text',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 48,
        text: 'Pregunta 20240506-1',
        type: 'text',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: null,
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 49,
        text: 'Pregunta 20240507-1',
        type: 'text',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: ['Postman', 'Dominio'],
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 50,
        text: 'Pregunta 20240507-2',
        type: 'text',
        version: 1,
        companyId: 27,
        visibility: true,
        labels: ['Postman', 'Dominio'],
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 51,
        text: 'Pregunta 20240508-1',
        type: 'text',
        version: 1,
        companyId: 27,
        visibility: false,
        labels: ['Postman', 'Domi'],
        status: true,
        group: 'Grupo CAP',
      },
      {
        id: 56,
        text: 'Testing DUMMY',
        type: 'text',
        version: 1,
        companyId: 27,
        visibility: true,
        labels: [],
        status: true,
        group: 'Grupo CAP',
      },
    ];
    return of(response);
  }

  getQuestionsByEvalId(id: number) {
    const url = this.apiGetQuestByEvalId;
    const params = new HttpParams({
      fromString: `id=${id}`,
    });
    return this.http
      .get<Quest[]>(url, { headers: this.headers, params })
      .pipe(retry(3), catchError(this.handleError));
  }

  setQuestionsOrder(quest: Question[]) {
    const url = this.apiSetQuestionsOrder;
    return this.http
      .post<Quest>(url, quest, { headers: this.headers })
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
