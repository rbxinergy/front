import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../interfaces/role.interface';
import { User } from '../interfaces/user.interface';
import { Company } from '../interfaces/company.interface';
import { GroupCompany } from '../interfaces/groupcompany.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private serverUrl: string = environment.serverUrl;
  private apiUrls = environment.apiUrls;

  constructor(private http: HttpClient) { 
  }

  token = sessionStorage.getItem('token')
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  createRole(role: Role): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls.role}/create`, role, { headers: this.headers, observe: 'response'})
  }

  uploadCSV(formData: FormData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': 'Bearer ' +  this.token,
      'cache-control': 'no-cache'
    });
    return this.http.post(`${this.serverUrl}${this.apiUrls.role}/create/upload/file`, formData, { headers, observe: 'response'});
  }

  updateRole(role: Role, id: string): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls.role}/update/${id}`, role, { headers: this.headers, observe: 'response'})
  }

  getAllRolesByClient(client: string){
    return this.http.get<any>(`${this.serverUrl}${this.apiUrls.role}/get/client/${client}`, { headers: this.headers })
  }

  getRoleByClient(role: string, client: string){
    return this.http.get<any>(`${this.serverUrl}${this.apiUrls.role}/get/${role}/client/${client}`, { headers: this.headers })
  }

  getAllRolesByCompany(company: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.serverUrl}${this.apiUrls.role}/get/company/${company}`, { headers: this.headers, observe: 'response' })
  }

  getRoleByCompany(role: string, company: Company){
    return this.http.get<any>(`${this.serverUrl}${this.apiUrls.role}/get/${role}/company/${company}`, { headers: this.headers })
  }

  getAllRolesByUser(user: User){
    return this.http.get<any>(`${this.serverUrl}${this.apiUrls.role}/get/user/${user}`, { headers: this.headers })
  }

  getRoleByUser(role: string, user: User){
    return this.http.get<any>(`${this.serverUrl}${this.apiUrls.role}/get/${role}/user/${user}`, { headers: this.headers })
  }

  deleteRole(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrls.role}/delete/${id}`, { headers: this.headers, observe: 'response'})
  }

}
