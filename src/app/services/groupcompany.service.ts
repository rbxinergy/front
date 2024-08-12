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
  groupDocument = '';
  serverUrl = environment.serverUrl;
  apiUrl = environment.apiUrls.groupCompany;

  token = sessionStorage.getItem('token')
  client: any;
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token,
    'cache-control': 'no-cache'
  })

  constructor(private http: HttpClient, private clientDataService: ClientDataService) { 
    // this.groupDocument = sessionStorage?.getItem('groupDocument') || '0';
    this.client = this.clientDataService.getClientData();
    console.log(this.client);
  }

  async saveGroupCompany(form: any):Promise<any>{
    console.log(this.groupDocument)
    const body = { 
        name: form.name,
        description: form.description,
        tag:form.tag,
        idClient:this.client.id
    }
    console.log(body)
    const postCompany = this.http.post<GroupCompany>(`${this.serverUrl}${this.apiUrl}/create`, body, { headers: this.headers })

    return await lastValueFrom(postCompany)  
  }

  getGroupCompanies(client: any){
    const params = new HttpParams({
      fromString: 'group=' + this.groupDocument + '&option=2'
    });
    return this.http.get<GroupCompany[]>(`${this.serverUrl}${this.apiUrl}/get/client/${client}`, { headers: this.headers})
  }

  // getGroupCompany(client: string, company: string) {
  //   return this.http.get<Company>(`${this.serverUrl}${this.apiUrl}/get/${client}/${company}`, { headers: this.headers})
  // }

  // getClients() {
  //   return of(clients);
  //   // this.http.get<Company[]>(`${this.serverUrl}${this.apiUrls.company}/get/cliente1/company`, { headers: this.headers})
  // }

  createGroupCompany(company: GroupCompany): Observable<HttpResponse<any>> {
    console.log(company)
    return this.http.post<any>(`${this.serverUrl}${this.apiUrl}/create`, company, { observe: 'response' });
  }

  updateGroupCompany(company: GroupCompany): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/update/${company.id}`, company ,{headers: this.headers, observe: 'response' });
  }

  deleteGroupCompany(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/${id}`, { observe: 'response' });
  }
}
