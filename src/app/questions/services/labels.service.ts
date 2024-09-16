import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  private headers!: HttpHeaders;
  
  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  token,
      'Cache-Control': 'no-cache'
    });
  }

  createLabel(data:any) {
    console.log("CREATE LABELS");
    const response = {
      "status": 200,
      "message": "Etiquetas repetidas / insertadas.",
      "existingLabels": [
          "Label1",
          "Label2"
      ],
      "insertedLabels": [
          "Label3",
          "Label4"
      ]
  }
    return of(response);
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
