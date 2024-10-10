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
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrl}/get/group-company/${groupCompany}`, { headers: this.headers, observe: 'response'})
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
