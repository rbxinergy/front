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

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Cache-Control': 'no-cache',
    });
  }

  getQuestionnaires(id: number): Observable<Quest[]> {
    // const params = new HttpParams({
    //   fromString: `id=${id}`
    // })
    // return this.http.get<Quest[]>(environment.apiGetQuestByCompany, {headers: this.headers, params});

    const response: Quest[] = [
      {
        questId: 7,
        subDomainId: 3,
        subDomainName: 'Cloud Privada',
        companyId: 27,
        documentNumber: '92926482-7',
        companyName: 'Compañía Minera del Pacífico',
        name: 'Cuestionario servicio celulares',
        description: 'test',
        status: true,
        createdAt: new Date('2024-04-03T03:00:00.000Z'),
        deletedAt: null,
        clientName: 'Grupo CAP',
        visibility: true,
      },
      {
        questId: 8,
        subDomainId: 3,
        subDomainName: 'Cloud Privada',
        companyId: 27,
        documentNumber: '92926482-7',
        companyName: 'Compañía Minera del Pacífico',
        name: 'Cuestionario servicio Prueba 1',
        description: 'test',
        status: true,
        createdAt: new Date('2024-04-03T03:00:00.000Z'),
        deletedAt: null,
        clientName: 'Grupo CAP',
        visibility: true,
      },
      {
        questId: 9,
        subDomainId: 3,
        subDomainName: 'Cloud Privada',
        companyId: 27,
        documentNumber: '92926482-7',
        companyName: 'Compañía Minera del Pacífico',
        name: 'Cuestionario servicio DEMO',
        description: 'test',
        status: true,
        createdAt: new Date('2024-04-03T03:00:00.000Z'),
        deletedAt: null,
        clientName: 'Grupo CAP',
        visibility: true,
      },
      {
        questId: 10,
        subDomainId: 3,
        subDomainName: 'Cloud Privada',
        companyId: 32,
        documentNumber: '76669880-8',
        companyName: 'Compañía Siderúrgica Huachipato',
        name: 'Cuestionario servicio Seguimiento',
        description: 'test',
        status: true,
        createdAt: new Date('2024-04-03T03:00:00.000Z'),
        deletedAt: null,
        clientName: 'Grupo CAP',
        visibility: true,
      },
      {
        questId: 11,
        subDomainId: 3,
        subDomainName: 'Cloud Privada',
        companyId: 32,
        documentNumber: '76669880-8',
        companyName: 'Compañía Siderúrgica Huachipato',
        name: 'Cuestionario servicio Datos Móviles',
        description: 'test',
        status: true,
        createdAt: new Date('2024-04-03T03:00:00.000Z'),
        deletedAt: null,
        clientName: 'Grupo CAP',
        visibility: false,
      },
      {
        questId: 12,
        subDomainId: 3,
        subDomainName: 'Cloud Privada',
        companyId: 32,
        documentNumber: '76669880-8',
        companyName: 'Compañía Siderúrgica Huachipato',
        name: 'Cuestionario servicio SMS',
        description: 'test',
        status: true,
        createdAt: new Date('2024-04-03T03:00:00.000Z'),
        deletedAt: null,
        clientName: 'Grupo CAP',
        visibility: false,
      },
      {
        questId: 13,
        subDomainId: 3,
        subDomainName: 'Cloud Privada',
        companyId: 32,
        documentNumber: '76669880-8',
        companyName: 'Compañía Siderúrgica Huachipato',
        name: 'Cuestionario test 1',
        description: 'Cuestionario de prueba local',
        status: true,
        createdAt: new Date('2024-04-09T04:00:00.000Z'),
        deletedAt: null,
        clientName: 'Grupo CAP',
        visibility: true,
      },
      {
        questId: 14,
        subDomainId: 3,
        subDomainName: 'Cloud Privada',
        companyId: 32,
        documentNumber: '76669880-8',
        companyName: 'Compañía Siderúrgica Huachipato',
        name: 'Cuestionario test 2',
        description: 'Cuestionario de prueba local 2',
        status: true,
        createdAt: new Date('2024-04-09T04:00:00.000Z'),
        deletedAt: null,
        clientName: 'Grupo CAP',
        visibility: true,
      },
      {
        questId: 19,
        subDomainId: 3,
        subDomainName: 'Cloud Privada',
        companyId: 27,
        documentNumber: '92926482-7',
        companyName: 'Compañía Minera del Pacífico',
        name: 'Cuestionario BACK',
        description: 'Cuestionario hecho en backoffice',
        status: true,
        createdAt: new Date('2024-09-10T03:00:00.000Z'),
        deletedAt: null,
        clientName: 'Grupo CAP',
        visibility: null,
      },
      {
        questId: 20,
        subDomainId: 3,
        subDomainName: 'Cloud Privada',
        companyId: 27,
        documentNumber: '92926482-7',
        companyName: 'Compañía Minera del Pacífico',
        name: 'Cuestionario TEST back',
        description: 'Cuestionario desde backpoffice',
        status: true,
        createdAt: new Date('2024-09-11T03:00:00.000Z'),
        deletedAt: null,
        clientName: 'Grupo CAP',
        visibility: null,
      },
    ];

    return of(response);
  }

  createQuestionnaire(data: Quest) {
    const url = environment.apiCreateQuestionnaire;
    return this.http
      .post(url, data, { headers: this.headers })
      .pipe(retry(3), catchError(this.handleError));
  }

  createQuestion(data: any): Observable<Quest> {
    const url = environment.apiPostQuestion;
    return this.http
      .post<Quest>(url, data, { headers: this.headers })
      .pipe(retry(3), catchError(this.handleError));
  }
  createQuestQuestion(data: any) {
    const url = environment.apiCreateQuestQuestion;
    return this.http
      .post(url, data, { headers: this.headers })
      .pipe(retry(3), catchError(this.handleError));
  }

  getQuestByQuestId(id: number) {
    const url = environment.apiGetQuestionsByQuestId;
    const params = new HttpParams({
      fromString: `id=${id}`,
    });
    return this.http
      .get<Quest>(url, { headers: this.headers, params })
      .pipe(retry(3), catchError(this.handleError));
  }

  getQuestionsByQuestId(id: number) {
    const url = environment.apiGetQuestionsByQuestId;
    const params = new HttpParams({
      fromString: `id=${id}`,
    });
    return this.http
      .get<Quest>(url, { headers: this.headers, params })
      .pipe(retry(3), catchError(this.handleError));
  }

  getQuestionsByCompanyId(id: number) {
    const url = environment.apiGetQuestionsByCompanyId;
    const params = new HttpParams({
      fromString: `id=${id}`,
    });
    return this.http
      .get<Question[]>(url, { headers: this.headers, params })
      .pipe(retry(3), catchError(this.handleError));
  }

  getQuestionsByEvalId(id: number) {
    // const url = environment.apiGetQuestByEvalId;
    // const params = new HttpParams({
    //   fromString: `id=${id}`,
    // });
    // return this.http
    //   .get<Quest[]>(url, { headers: this.headers, params })
    //   .pipe(retry(3), catchError(this.handleError));

    const response: Quest[] = [
      {
          "id": 130,
          "questId": 7,
          "subDomainId": 3,
          "subDomainName": "Cloud Privada",
          "companyId": 27,
          "documentNumber": "92926482-7",
          "companyName": "Compañía Minera del Pacífico",
          "name": "Cuestionario servicio celulares",
          "description": "test",
          "status": true,
          "createdAt": new Date("2024-04-03T03:00:00.000Z"),
          "deletedAt": null,
          "group": true,
          "visibility": true
      },
      {
          "id": 131,
          "questId": 8,
          "subDomainId": 3,
          "subDomainName": "Cloud Privada",
          "companyId": 27,
          "documentNumber": "92926482-7",
          "companyName": "Compañía Minera del Pacífico",
          "name": "Cuestionario servicio Prueba 1",
          "description": "test",
          "status": true,
          "createdAt": new Date("2024-04-03T03:00:00.000Z"),
          "deletedAt": null,
          "group": true,
          "visibility": true
      },
      {
          "id": 132,
          "questId": 10,
          "subDomainId": 3,
          "subDomainName": "Cloud Privada",
          "companyId": 32,
          "documentNumber": "76669880-8",
          "companyName": "Compañía Siderúrgica Huachipato",
          "name": "Cuestionario servicio Seguimiento",
          "description": "test",
          "status": true,
          "createdAt": new Date("2024-04-03T03:00:00.000Z"),
          "deletedAt": null,
          "group": true,
          "visibility": true
      },
      {
          "id": 133,
          "questId": 11,
          "subDomainId": 3,
          "subDomainName": "Cloud Privada",
          "companyId": 32,
          "documentNumber": "76669880-8",
          "companyName": "Compañía Siderúrgica Huachipato",
          "name": "Cuestionario servicio Datos Móviles",
          "description": "test",
          "status": true,
          "createdAt": new Date("2024-04-03T03:00:00.000Z"),
          "deletedAt": null,
          "group": true,
          "visibility": false
      }
  ]
  return of(response);
  }

  setQuestionsOrder(quest: Question[]) {
    const url = environment.apiSetQuestionsOrder;
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
