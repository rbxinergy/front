import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetprofileService {

  constructor(private http:HttpClient) {
  }

  async getUserProfile(email: string):Promise<any> {
    const url = environment.getProfileUrl;
    const channel = environment.channel
    // const url = 'http://localhost:8080/get-profile/api/get-profile'
    const token = localStorage.getItem('token')

    console.log('Token: ', token)

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  token
    })
    const params = new HttpParams({
      fromString: 'email=' + email + '&channel=' + channel
    })
    console.log(url, {headers, params})
    const result = this.http.get<any>(url, {headers, params});
    return await lastValueFrom<any>(result)
  }
 
}
