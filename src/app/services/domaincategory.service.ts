import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomainCategory } from '../interfaces/domaincategory.interface';
import { environment } from 'src/environments/environment';
import { GroupCompanyService } from './groupcompany.service';
import { GroupcompanyDataService } from './groupcompany-data.service';
import { GroupCompany } from '../interfaces/groupcompany.interface';

@Injectable({
  providedIn: 'root'
})
export class DomainCategoryService {
  private apiUrls = environment.apiUrls.domainCategory;
  private serverUrl = environment.serverUrl;

  token: string = sessionStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  groupCompany: any;

  constructor(private http: HttpClient, private groupCompanyService: GroupcompanyDataService) {
    this.groupCompany = this.groupCompanyService.getGroupCompanyData();
  }

  createDomainCategory(domainCategory: DomainCategory): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls}/create`, domainCategory, { observe: 'response' });
  }

  uploadCSV(formData: FormData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': 'Bearer ' +  this.token,
      'cache-control': 'no-cache'
    });
    return this.http.post(`${this.serverUrl}${this.apiUrls}/create/upload/file`, formData, { headers, observe: 'response'});
  }

  updateDomainCategory(domainCategory: DomainCategory): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls}/update/${domainCategory.id}`, domainCategory, { observe: 'response' });
  }
  
  getAllDomainCategories(groupCompany: GroupCompany): Observable<DomainCategory[]> {
    return this.http.get<DomainCategory[]>(`${this.serverUrl}${this.apiUrls}/get/group-company/${groupCompany}`,  {headers: this.headers});
  }

  getDomainCategory(domainCategory: DomainCategory, groupCompany: GroupCompany): Observable<DomainCategory[]> {
    return this.http.get<DomainCategory[]>(`${this.serverUrl}${this.apiUrls}/get/${domainCategory}/group-company/${groupCompany}`, {headers: this.headers});
  }

  deleteDomainCategory(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrls}/delete/${id}`, { observe: 'response' });
  }

  deleteCascadeDomainCategory(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrls}/delete/cascade/${id}`, { observe: 'response' });
  }

  getDomainCategoryByClient(clientId: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.serverUrl}${this.apiUrls}/get/client/${clientId}`, {headers: this.headers, observe: 'response'});
  }
}




