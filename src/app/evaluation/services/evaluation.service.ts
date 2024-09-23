import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Evaluation } from '../interfaces/evaluation.interface';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  headers!: HttpHeaders;
  private evaluations: Evaluation[] = [
    {
      "evalid": 2,
      "evalname": "SMS BACKOFFICE DUMMY",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-04-03T23:30:20.134Z"),
      "type": 1,
      "visibility": false
    },
    {
      "evalid": 3,
      "evalname": "SMS",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-04-03T23:30:20.134Z"),
      "type": 2,
      "visibility": null
    },
    {
      "evalid": 4,
      "evalname": "SMS",
      "companyid": 38,
      "companyname": "CAP Infraestructura",
      "createdAt": new Date("2024-04-03T23:35:25.369Z"),
      "type": 2,
      "visibility": null
    },
    {
      "evalid": 5,
      "evalname": "SMS",
      "companyid": 38,
      "companyname": "CAP Infraestructura",
      "createdAt": new Date("2024-04-03T23:35:25.369Z"),
      "type": 2,
      "visibility": null
    },
    {
      "evalid": 8,
      "evalname": "SMS",
      "companyid": 31,
      "companyname": "E-SECURITY",
      "createdAt": new Date("2024-04-03T23:35:25.369Z"),
      "type": 2,
      "visibility": null
    },
    {
      "evalid": 9,
      "evalname": "SMS",
      "companyid": 31,
      "companyname": "E-SECURITY",
      "createdAt": new Date("2024-04-03T23:35:25.369Z"),
      "type": 2,
      "visibility": null
    },
    {
      "evalid": 10,
      "evalname": "SMS",
      "companyid": 10,
      "companyname": "Lolo 1",
      "createdAt": new Date("2024-04-03T23:35:25.369Z"),
      "type": 2,
      "visibility": null
    },
    {
      "evalid": 11,
      "evalname": "SMS",
      "companyid": 10,
      "companyname": "Lolo 1",
      "createdAt": new Date("2024-04-03T23:35:25.369Z"),
      "type": 2,
      "visibility": null
    },
    {
      "evalid": 12,
      "evalname": "SMS",
      "companyid": 20,
      "companyname": "Proveedor Rok 3",
      "createdAt": new Date("2024-04-03T23:35:25.369Z"),
      "type": 2,
      "visibility": null
    },
    {
      "evalid": 13,
      "evalname": "SMS",
      "companyid": 20,
      "companyname": "Proveedor Rok 3",
      "createdAt": new Date("2024-04-03T23:35:25.369Z"),
      "type": 2,
      "visibility": null
    },
    {
      "evalid": 14,
      "evalname": "Test Form UPDATE",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-04-12T16:16:27.421Z"),
      "type": 2,
      "visibility": false
    },
    {
      "evalid": 15,
      "evalname": "Testing mensaje",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-04-12T20:49:15.780Z"),
      "type": 1,
      "visibility": false
    },
    {
      "evalid": 16,
      "evalname": "Test 2",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-04-12T20:50:13.316Z"),
      "type": 1,
      "visibility": null
    },
    {
      "evalid": 17,
      "evalname": "Evaluation dialog UPD",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-04-13T17:18:24.440Z"),
      "type": 1,
      "visibility": false
    },
    {
      "evalid": 22,
      "evalname": "Evaluation dialog UPD",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-04-16T22:15:26.708Z"),
      "type": 1,
      "visibility": null
    },
    {
      "evalid": 23,
      "evalname": "SMS UPD",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-04-17T13:17:26.662Z"),
      "type": 2,
      "visibility": null
    },
    {
      "evalid": 28,
      "evalname": "20240425 visibilidad",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-04-25T21:05:05.269Z"),
      "type": 1,
      "visibility": true
    },
    {
      "evalid": 29,
      "evalname": "20240425  visibilidad 2",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-04-25T21:13:02.696Z"),
      "type": 1,
      "visibility": true
    },
    {
      "evalid": 30,
      "evalname": "Evaluacióin 1",
      "companyid": 27,
      "companyname": "Compañía Minera del Pacífico",
      "createdAt": new Date("2024-07-19T15:20:33.060Z"),
      "type": 1,
      "visibility": false
    }
  ];

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  sessionStorage.getItem('token'),
      'Cache-Control': 'no-cache'
    });
  }

  getEvaluationsByCompanyId(id: number): Observable<Evaluation[]> {
    return of(this.evaluations.filter(evaluation => evaluation.companyid === id));
  }

  createEvaluation(data: Evaluation): Observable<Evaluation> {
    const newEvaluation = {
      ...data,
      evalid: this.evaluations.length ? Math.max(...this.evaluations.map(e => e.evalid)) + 1 : 1,
      createdAt: new Date()
    };
    this.evaluations.push(newEvaluation);
    console.log("New evaluation created:", newEvaluation);
    console.log("Updated evaluations:", this.evaluations);
    return of(newEvaluation);
  }

  updateEvaluation(data: Evaluation): Observable<Evaluation> {
    const index = this.evaluations.findIndex(e => e.evalid === data.evalid);
    if (index !== -1) {
      this.evaluations[index] = { ...this.evaluations[index], ...data };
      console.log("Evaluation updated:", this.evaluations[index]);
      return of(this.evaluations[index]);
    }
    return throwError(() => new Error('Evaluation not found'));
  }

  deleteEvaluation(id: number): Observable<void> {
    const index = this.evaluations.findIndex(e => e.evalid === id);
    if (index !== -1) {
      this.evaluations.splice(index, 1);
      console.log("Evaluation deleted:", id);
      console.log("Updated evaluations:", this.evaluations);
      return of(void 0);
    }
    return throwError(() => new Error('Evaluation not found'));
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
