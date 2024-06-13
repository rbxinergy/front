import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { roles } from '../dummy-data/role.dummy';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private groupDocument: string = '';

  constructor(private http: HttpClient) { 
    this.groupDocument = sessionStorage?.getItem('groupDocument') || '0'
  }

  token = sessionStorage.getItem('token')
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  getRoles() {
    return of(roles)
  }
}
