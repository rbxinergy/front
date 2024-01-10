import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetprofileService {
  // url = 'http://localhost:8080/get-profile'
  // result;
  // error;
  
  constructor(private http:HttpClient) {
    
  }
  // ngOnInit() {   // <---
  //   this.http.get<any>(this.url).subscribe(data => {
  //      this.result = data;
  //   },error => this.error = error);
  // }
 async getUserProfile(email: string):Promise<any> {
    const url = 'http://localhost:8080/get-profile/api/get-profile'
    const token = localStorage.getItem('token')

    console.log('Token: ', token)


    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  token
    })
    const params = new HttpParams({
      fromString: 'email=' + email
    })
    console.log(url, {headers, params})
    const result = this.http.get<any>(url, {headers, params});
    return await lastValueFrom<any>(result)
  }
 
}
