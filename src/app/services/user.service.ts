import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../intefaces/users';

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

  getUsers(client: any, company: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.serverUrl}${this.apiUrl}`, {headers: this.headers});
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}${this.apiUrl}/${id}`, {headers: this.headers});
  }

  createUser(user: any): Observable<User> {
    return this.http.post<User>(`${this.serverUrl}${this.apiUrl}`, user, {headers: this.headers});
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.serverUrl}${this.apiUrl}/${id}`, user, {headers: this.headers});
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.serverUrl}${this.apiUrl}/${id}`, {headers: this.headers});
  }
}
