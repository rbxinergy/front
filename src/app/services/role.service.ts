import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { roles } from '../shared/dummy-data/role.dummy';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../intefaces/role.interface';

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

  getRoles(client: string, company: string) {
    return this.http.get<Role[]>(`${this.serverUrl}${this.apiUrls.role}/get/${client}/${company}`, { headers: this.headers})
  }
}
