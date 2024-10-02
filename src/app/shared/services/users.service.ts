import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiGetRoles = ''; // TODO: change to environment.apiUrls.roleModule
  apiGetUsers = ''; // TODO: change to environment.apiUrls.roleModule
  apiGetUsersRoles = ''; // TODO: change to environment.apiUrls.roleModule
  apiPostUser = ''; // TODO: change to environment.apiUrls.roleModule

  constructor(private http: HttpClient) { }

  token = sessionStorage.getItem('token')
  userId = sessionStorage.getItem('userId')
  userCreator = sessionStorage.getItem('userCreator')
  groupDocument = sessionStorage.getItem('groupDocument')

  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  getRoles(): Observable<any>{
    const url = this.apiGetRoles;
    return this.http.get<any>(url, { headers: this.headers })
  }
  getUsers(): Observable<any>{
    const url = this.apiGetUsers;
    return this.http.get<any>(url, { headers: this.headers })
  } 
  getUsersRoles(): Observable<any>{
    const url = this.apiGetUsersRoles;
    const params = new HttpParams({
      fromString: 'group=' + this.groupDocument
    })
    return this.http.get<any>(url, { headers: this.headers, params })
  } 


  // Observable<any>
  async postUser(form:any):Promise<any>{
    const body = { 
      "userId": this.userId,
      "appId": 2,
      "roleId": parseInt(form.rolId),
      "companyId": parseInt(form.companyId),
      "email": form.email,
      "firstName": form.firstName,
      "lastName":form.lastName,
      "position": form.position,
      "userCreator": this.userCreator
    }
    console.log(body)

    const url = this.apiPostUser;
    const postUser = this.http.post<any>(url, body, { headers: this.headers })
    return await lastValueFrom(postUser)  
  
  }


}
