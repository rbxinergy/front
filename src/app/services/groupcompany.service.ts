import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clients } from '../shared/dummy-data/client-company.dummy';
import { GroupCompany } from '../interfaces/groupcompany.interface';
import { ClientDataService } from './client-data.service';

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

  // async saveGroupCompany(form: any):Promise<any>{
  //   console.log(this.groupDocument)
  //   const body = { 
  //       name: form.name,
  //       description: form.description,
  //       tag:form.tag,
  //       idClient:this.client.id
  //   }
  //   console.log(body)
  //   const postCompany = this.http.post<GroupCompany>(`${this.serverUrl}${this.apiUrl}/create`, body, { headers: this.headers })

  //   return await lastValueFrom(postCompany)  
  // }
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
    return this.http.get<any>(`${this.serverUrl}${this.apiUrl}/get/client/${client}`, { headers: this.headers, observe: 'response'})
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
