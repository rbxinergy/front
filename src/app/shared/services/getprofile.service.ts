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
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  token,
      'cache-control': 'no-cache'
    })
    const params = new HttpParams({
      fromString: 'email=' + email + '&channel=' + channel
    })
    const result = this.http.get<any>(url, {headers, params});
    return await lastValueFrom<any>(result)
  }
  
}
