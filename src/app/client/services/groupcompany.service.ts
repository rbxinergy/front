import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GroupCompany } from '../interfaces/groupcompany.interface';
import { ClientDataService } from './client-data.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupCompanyService {
  serverUrl = environment.serverUrl;
  apiUrl = environment.apiUrls.groupCompany;

  token = sessionStorage.getItem('token')
  client: any;
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token,
    'cache-control': 'no-cache'
  })

  constructor(private http: HttpClient, private clientDataService: ClientDataService) { 
    this.client = this.clientDataService.getClientData();
  }

  createGroupCompany(company: GroupCompany): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrl}/create`, company, { observe: 'response' });
  }

  uploadCSV(formData: FormData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': 'Bearer ' +  this.token,
      'cache-control': 'no-cache'
    });
    return this.http.post(`${this.serverUrl}${this.apiUrl}/create/upload/file`, formData, { headers, observe: 'response'});
  }

  updateGroupCompany(company: GroupCompany): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/update/${company.id}`, company ,{headers: this.headers, observe: 'response' });
  }

  getGroupCompanies(client: any): Observable<HttpResponse<any>> {
    // return this.http.get<any>(`${this.serverUrl}${this.apiUrl}/get/client/${client}`, { headers: this.headers, observe: 'response'})
    const dataDummy = [
      {
          "id": 1,
          "name": "Santander UK",
          "description": "Operaciones en el Reino Unido.",
          "tag": "UK"
      },
      {
          "id": 2,
          "name": "Santander Brasil",
          "description": "Una de las principales operaciones del banco en América Latina.",
          "tag": "Brasil"
      },
      {
          "id": 3,
          "name": "Santander España",
          "description": "La sede principal y operaciones en España.",
          "tag": "España"
      },
      {
          "id": 4,
          "name": "Santander Consumer USA",
          "description": "Enfocado en servicios financieros al consumidor en Estados Unidos.",
          "tag": "USA"
      },
      {
          "id": 5,
          "name": "Santander México",
          "description": "Operaciones en México.",
          "tag": "México"
      },
      {
          "id": 6,
          "name": "Santander Chile",
          "description": "Presencia significativa en el mercado chileno.",
          "tag": "Chile"
      },
      {
          "id": 7,
          "name": "Santander Argentina",
          "description": "Operaciones en Argentina.",
          "tag": "Argentina"
      },
      {
          "id": 8,
          "name": "Santander Portugal",
          "description": "Operaciones en Portugal.",
          "tag": "Portugal"
      },
      {
          "id": 9,
          "name": "Santander Alemania",
          "description": "Presencia en el mercado alemán.",
          "tag": "Alemania"
      },
      {
          "id": 10,
          "name": "Santander Bank, N.A.",
          "description": "Operaciones en el noreste de Estados Unidos.",
          "tag": "USA"
      }
  ];
    return of(new HttpResponse({ body: dataDummy }));
  }

  getGroupCompany(idGroupCompany: string, client: string) {
    return this.http.get<GroupCompany[]>(`${this.serverUrl}${this.apiUrl}/get/${idGroupCompany}/client/${client}`, { headers: this.headers})
  }

  deleteGroupCompany(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/${id}`, { observe: 'response' });
  }

  deleteCascadeGroupCompany(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/cascade/${id}`, { observe: 'response' });
  }

}
