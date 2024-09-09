import { Injectable } from '@angular/core';
import { CompanySubDomain } from '../interfaces/subdomain.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetSubDomainService {

  constructor(private http: HttpClient) { }

  getData(id: number): Observable<CompanySubDomain> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  token,
      'Cache-Control': 'no-cache'
    });

    const params = new HttpParams({
      fromString: `id=${id}`
    })
    return this.http.get<CompanySubDomain>(environment.apiGetAllSubdomain, {headers, params});
  }
}
