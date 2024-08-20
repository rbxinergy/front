import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clients } from '../shared/dummy-data/client-company.dummy';
import { GroupCompany } from '../interfaces/groupcompany.interface';
import { ClientDataService } from './client-data.service';
import { ServiceCategory } from '../interfaces/servicecategory.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {
  serverUrl = environment.serverUrl;
  apiUrl = environment.apiUrls.serviceCategory;

  token = sessionStorage.getItem('token')
  client: any;
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token,
    'cache-control': 'no-cache'
  })

  constructor(private http: HttpClient) { 
  }

  createServiceCategory(serviceCategory: ServiceCategory): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrl}/create`, serviceCategory, { observe: 'response' });
  }

  uploadCSV(formData: FormData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': 'Bearer ' +  this.token,
      'cache-control': 'no-cache'
    });
    return this.http.post(`${this.serverUrl}${this.apiUrl}/create/upload/file`, formData, { headers, observe: 'response'});
  }

  updateServiceCategory(serviceCategory: ServiceCategory): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/update/${serviceCategory.id}`, serviceCategory, { observe: 'response' });
  }

  getServiceCategories(): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(`${this.serverUrl}${this.apiUrl}/get/cliente1`, {headers: this.headers});
  }

  getallServiceCategories(groupCompany: GroupCompany): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(`${this.serverUrl}${this.apiUrl}/get/group-company/${groupCompany.id}`,  {headers: this.headers});
  }

  deleteServiceCategory(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrl}/delete/${id}`, { observe: 'response' });
  }

}
