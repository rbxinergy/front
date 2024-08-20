import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../interfaces/company.interface';
import { ClientDataService } from './client-data.service';
import { GroupcompanyDataService } from './groupcompany-data.service';

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
    console.log(this.client);
  }

  // async saveCompany(form: any):Promise<any>{
  //   console.log(this.groupDocument)
  //   const body = { 
  //     "name": form.name,
  //     "documentNumber": form.documentNumber,
  //     "documentType": form.documentType,
  //     "phone": form.phone,
  //     "email": form.email,
  //     "groupDocument": this.groupDocument,
  //     "address":form.address,
  //     "cityId": parseInt(form.cityId),
  //     "stateId": parseInt(form.stateId),
  //     "countryId": parseInt(form.countryId),
  //     "isGroup": false
  //   }
  //   console.log(body)
  //   const postCompany = this.http.post<Company>(`${this.serverUrl}${this.apiUrls.company}/create`, body, { headers: this.headers })

  //   return await lastValueFrom(postCompany)  
  // }
  createCompany(company: Company): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrl}/create`, company, { observe: 'response' });
  }

  updateCompany(company: Company): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/update/${company.id}`, company, { headers: this.headers, observe: 'response' });
  }


  getCompaniesByGroup(groupCompany: any){
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrl}/get/group-company/${groupCompany}`, { headers: this.headers})
  }

  getCompany(company: string, groupCompany: string) {
    return this.http.get<Company>(`${this.serverUrl}${this.apiUrl}/get/${company}/group-company/${groupCompany}`, { headers: this.headers})
  }

  getCompaniesByClient(client: any){
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrl}/get/client/${client}`, { headers: this.headers})
  }

  deleteCompany(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/${id}`, { observe: 'response' });
  }

  uploadCSV(formData: FormData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': 'Bearer ' +  this.token,
      'cache-control': 'no-cache'
    });
    return this.http.post(`${this.serverUrl}${this.apiUrl}/create/upload/file`, formData, { headers, observe: 'response'});
  }
}
