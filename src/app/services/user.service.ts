import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrls.user;
  private serverUrl = environment.serverUrl;
  token: string = sessionStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<HttpResponse<any> >{
    return this.http.post<any>(`${this.serverUrl}${this.apiUrl}/create`, {user}, { observe: 'response' });
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.serverUrl}${this.apiUrl}/update/${id}`, user, {headers: this.headers});
  }

  getAllUsersByClientAndCompany(client: string, company: string): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}${this.apiUrl}/get/client/${client}/company/${company}`, {headers: this.headers});
  }

  getAllUsersbyRole(role: string): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}${this.apiUrl}/get/role/${role}`, {headers: this.headers});
  }

  getAllUsersByClient(client: string){
    return this.http.get<User>(`${this.serverUrl}${this.apiUrl}/get/client/${client}`, {headers: this.headers});
  }


  getAllUsersByRoleOfClient(client: string, role: string): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}${this.apiUrl}/get/client/${client}/role/${role}`, {headers: this.headers});
  }

  getUsers(client: any, company?: any): Observable<User[]> {
    if (company) {
      return this.http.get<User[]>(`${this.serverUrl}${this.apiUrl}/get/${client}/${company}`, {headers: this.headers});
    } else {
      return this.http.get<User[]>(`${this.serverUrl}${this.apiUrl}/get/${client}`, {headers: this.headers});
    }
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}${this.apiUrl}/${id}`, {headers: this.headers});
  }



  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.serverUrl}${this.apiUrl}/delete/${id}`, {headers: this.headers});
  }

  addUsersToCompany(user: User): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrl}/update`, user, { headers: this.headers, observe: 'response'})
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
