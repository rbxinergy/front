import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subdomain } from '../interfaces/subdomain.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubdomainService {
  private apiUrl = environment.apiUrls.subdomain;
  private serverUrl = environment.serverUrl;
  token: string = sessionStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  constructor(private http: HttpClient) {}

  getSubdomains(): Observable<Subdomain[]> {
    return this.http.get<Subdomain[]>(`${this.serverUrl}${this.apiUrl}/get/cliente1`, {headers: this.headers});
  }

  createSubdomain(subdomain: Subdomain): Observable<Subdomain> {
    return this.http.post<Subdomain>(`${this.serverUrl}${this.apiUrl}/create`, subdomain, {headers: this.headers});
  }
}
