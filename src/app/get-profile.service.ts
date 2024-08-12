import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {

  constructor(private http: HttpClient) { }

  async getUserProfile(email: string):Promise<any> {
    const url = environment.getProfileUrl;

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  token
    })
    const params = new HttpParams({
      fromString: `email=${email}&channel=${environment.channel}`
    })
    const result = this.http.get<any>(url, {headers, params});
    return await lastValueFrom<any>(result)
  }

}
