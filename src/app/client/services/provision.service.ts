import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../interfaces/company.interface';
import { ClientDataService } from './client-data.service';
import { GroupcompanyDataService } from './groupcompany-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProvisionService {
  serverUrl = environment.serverUrl;
  apiUrl = environment.apiUrls.provision;

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

  createProvision(provision: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrl}/create`, provision, { observe: 'response' });
  }

  uploadCSV(formData: FormData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': 'Bearer ' +  this.token,
      'cache-control': 'no-cache'
    });
    return this.http.post(`${this.serverUrl}${this.apiUrl}/create/upload/file`, formData, { headers, observe: 'response'});
  }

  updateProvision(provision: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/update/${provision.id}`, provision, { headers: this.headers, observe: 'response' });
  }

  getProvisionsByGroupCompany(groupCompany: string) {
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrl}/get/group-company/${groupCompany}`, { headers: this.headers})
  }

  getProvisionsByClient(client: any): Observable<HttpResponse<Company[]>> {
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrl}/get/client/${client}`, { headers: this.headers, observe: 'response'})
  }

  getProvisionByProvisionAndGroupCompany(idProvision: string, idGroupCompany: string): Observable<HttpResponse<Company[]>> {
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrl}/get/${idProvision}/group-company/${idGroupCompany}`, { headers: this.headers, observe: 'response'})
  }

  getProvision(idProvision: string, idClient: string): Observable<HttpResponse<Company[]>> {
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrl}/get/${idProvision}/client/${idClient}`, { headers: this.headers, observe: 'response'})
  }

  deleteProvision(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/${id}`, { observe: 'response' });
  }

}
