import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanySubDomain } from '../interfaces/subdomain.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubdomainService {

  apiGetSubDomain = ''; // TODO: change to environment.apiUrls.questionnairesModule

  constructor(private http: HttpClient) { }

  getData(groupDocument: string): Observable<CompanySubDomain> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  token
    });

    const params = new HttpParams({
      fromString: `groupDocument=${groupDocument}`
    })
    return this.http.get<CompanySubDomain>(this.apiGetSubDomain, {headers, params});
  }
}
