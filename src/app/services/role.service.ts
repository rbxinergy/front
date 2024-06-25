import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { roles } from '../shared/dummy-data/role.dummy';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private groupDocument: string = '';
  private serverUrl: string = environment.serverUrl;
  private apiUrls = environment.apiUrls;

  constructor(private http: HttpClient) { 
    this.groupDocument = sessionStorage?.getItem('groupDocument') || '0'
  }

  token = sessionStorage.getItem('token')
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  getRoles(client: string, company?: string): Observable<HttpResponse<any>>{
    if(company){
      return this.http.get<any>(`${this.serverUrl}${this.apiUrls.role}/get/${client}/${company}`, { headers: this.headers, observe: 'response'})
    }
    return this.http.get<any>(`${this.serverUrl}${this.apiUrls.role}/get/${client}`, { headers: this.headers, observe: 'response'})
  }

  createRole(role: Role): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls.role}/create`, role, { headers: this.headers, observe: 'response'})
  }
  updateRole(role: Role): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls.role}/update`, role, { headers: this.headers, observe: 'response'})
  }

  deleteRole(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrls.role}/delete/${id}`, { headers: this.headers, observe: 'response'})
  }
}
