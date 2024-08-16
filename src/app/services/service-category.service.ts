import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupCompany } from '../interfaces/groupcompany.interface';
import { GroupcompanyDataService } from './groupcompany-data.service';
import { ServiceCategory } from '../interfaces/servicecategory.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {

  private apiUrls = environment.apiUrls.serviceCategory;
  private serverUrl = environment.serverUrl;
  token: string = sessionStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })
  groupCompany: any;

  constructor(private http: HttpClient, private groupCompanyService: GroupcompanyDataService) {
    this.groupCompany = this.groupCompanyService.getGroupCompanyData();
    console.log(this.groupCompany);
  }

  getServiceCategories(): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(`${this.serverUrl}${this.apiUrls}/get/cliente1`, {headers: this.headers});
  }
  getallServiceCategories(groupCompany: GroupCompany): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(`${this.serverUrl}${this.apiUrls}/get/group-company/${groupCompany.id}`,  {headers: this.headers});
  }

  createServiceCategory(serviceCategory: ServiceCategory): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls}/create`, serviceCategory, { observe: 'response' });
  }

  updateServiceCategory(serviceCategory: ServiceCategory): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls}/update/${serviceCategory.id}`, serviceCategory, { observe: 'response' });
  }

  deleteServiceCategory(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrls}/delete/${id}`, { observe: 'response' });
  }

}
