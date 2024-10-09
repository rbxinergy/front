import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../interfaces/company.interface';
import { ClientDataService } from '../services/client-data.service';
import { GroupcompanyDataService } from '../services/groupcompany-data.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  serverUrl = environment.serverUrl;
  apiUrl = environment.apiUrls.company;

  token = sessionStorage.getItem('token');
  client: any;
  groupCompany: any;
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  });

  constructor(private http: HttpClient, private clientDataService: ClientDataService, private groupCompanyDataService: GroupcompanyDataService) {
    this.client = this.clientDataService.getClientData();
    this.groupCompany = this.groupCompanyDataService.getGroupCompanyData();
  }

  createCompany(company: Company): Observable<HttpResponse<any>> {
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

  updateCompany(company: Company): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/update/${company.id}`, company, { headers: this.headers, observe: 'response' });
  }

  getCompaniesByGroup(groupCompany: any): Observable<HttpResponse<Company[]>> {
    // return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrl}/get/group-company/${groupCompany}`, { headers: this.headers, observe: 'response'})
    const dataDummy = [
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Grupo Santander",
        "businessName": "Banco Santander Chile",
        "address": "Bandera 140, Santiago, Chile",
        "country": "Chile",
        "county": "Santiago",
        "city": "Santiago",
        "district": "Santiago Centro",
        "state": "Región Metropolitana",
        "documentType": "RUT",
        "document": "97.036.000-K",
        "tag": "banking",
        "active": true,
        "createdDate": "2023-10-01 10:00:00.000",
        "modificatedDate": "2023-10-01 10:00:00.000",
        "idContact": [
          "550e8400-e29b-41d4-a716-446655440002"
        ]
      },
      {
        "id": "550e8400-e29b-41d4-a716-446655440003",
        "name": "Santander Consumer Chile",
        "businessName": "Santander Consumer Chile S.A.",
        "address": "Avenida Providencia 1760, Santiago, Chile",
        "country": "Chile",
        "county": "Santiago",
        "city": "Santiago",
        "district": "Providencia",
        "state": "Región Metropolitana",
        "documentType": "RUT",
        "document": "76.123.456-7",
        "tag": "consumer-finance",
        "active": true,
        "createdDate": "2023-10-01 10:00:00.000",
        "modificatedDate": "2023-10-01 10:00:00.000",
        "idContact": [
          "550e8400-e29b-41d4-a716-446655440004"
        ]
      },
      {
        "id": "550e8400-e29b-41d4-a716-446655440005",
        "name": "Santander Corredores de Bolsa",
        "businessName": "Santander Corredores de Bolsa Limitada",
        "address": "Bandera 140, Santiago, Chile",
        "country": "Chile",
        "county": "Santiago",
        "city": "Santiago",
        "district": "Santiago Centro",
        "state": "Región Metropolitana",
        "documentType": "RUT",
        "document": "96.789.123-4",
        "tag": "brokerage",
        "active": true,
        "createdDate": "2023-10-01 10:00:00.000",
        "modificatedDate": "2023-10-01 10:00:00.000",
        "idContact": [
          "550e8400-e29b-41d4-a716-446655440006"
        ]
      }
    ]
    return of(new HttpResponse({ body: dataDummy as Company[] }));
  }

  getCompany(company: string, groupCompany: string) {
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrl}/get/${company}/group-company/${groupCompany}`, { headers: this.headers})
  }

  getCompaniesByClient(client: any): Observable<HttpResponse<Company[]>> {
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrl}/get/client/${client}`, { headers: this.headers, observe: 'response'})
  }

  deleteCompany(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/${id}`, { observe: 'response' });
  }

  deleteCascadeCompany(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/cascade/${id}`, { observe: 'response' });
  }

}
