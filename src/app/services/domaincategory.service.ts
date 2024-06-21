import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomainCategory } from '../interfaces/domaincategory.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DomainCategoryService {
  private apiUrl = environment.apiUrls.domainCategory;
  private serverUrl = environment.serverUrl;
  token: string = sessionStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  constructor(private http: HttpClient) {}

  getDomainCategories(): Observable<DomainCategory[]> {
    return this.http.get<DomainCategory[]>(`${this.serverUrl}${this.apiUrl}/get/cliente1`, {headers: this.headers});
  }
}
