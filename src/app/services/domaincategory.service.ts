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
  groupDocument = '';
  private apiUrls = environment.apiUrls.domainCategory;
  private serverUrl = environment.serverUrl;
  token: string = sessionStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })
  groupCompany: any;

  constructor(private http: HttpClient, private groupCompanyService: GroupcompanyDataService) {
    this.groupDocument = sessionStorage?.getItem('groupDocument') || '0';
    this.groupCompany = this.groupCompanyService.getGroupCompanyData();
    console.log(this.groupCompany);
  }

  getDomainCategories(): Observable<DomainCategory[]> {
    return this.http.get<DomainCategory[]>(`${this.serverUrl}${this.apiUrls}/get/cliente1`, {headers: this.headers});
  }
  getallDomainCategories(groupCompany: GroupCompany): Observable<DomainCategory[]> {
    return this.http.get<DomainCategory[]>(`${this.serverUrl}${this.apiUrls}/get/group-company/${groupCompany}`,  {headers: this.headers});
  }

  createDomainCategory(domainCategory: DomainCategory): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls}/create`, domainCategory, { observe: 'response' });
  }

  updateDomainCategory(domainCategory: DomainCategory): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls}/update`, domainCategory, { observe: 'response' });
  }

  deleteCompany(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrls}/delete/${id}`, { observe: 'response' });
  }

}




