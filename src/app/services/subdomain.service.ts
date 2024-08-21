import { Injectable } from '@angular/core';
import { Subdomain } from '../interfaces/subdomain.interface';
import { Domain, SubDomain } from '../interfaces/domain.interface';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, Subscription, catchError, lastValueFrom, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubdomainDataService } from './subdomain-data.service';
import { subdomains } from '../shared/dummy-data/subdomains-domain.dummy';

@Injectable({
  providedIn: 'root'
})

export class SubdomainService {
  subdomains: any;
  subdomain:any;
  private apiUrls = environment.apiUrls;
  private serverUrl = environment.serverUrl;
  token: string = sessionStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })
  constructor(private http: HttpClient, private subdomainDataService: SubdomainDataService) { 
    this.subdomain = this.subdomainDataService.getSubdomainData();
  }

  // async saveSubdomain(form: any):Promise<any>{
  //   const body = { 
  //     "name": form.name,
  //     "description": form.description,
  //     "tag": form.tag,
  //     "idDomain": form.idDomain,
  //   }
  //   console.log(body)
  //   const postSubdomain = this.http.post<SubDomain>(`${this.serverUrl}${this.apiUrls.subdomain}/create`, body, { headers: this.headers })

  //   return await lastValueFrom(postSubdomain)  
  // }

  createSubdomain(subdomain: SubDomain): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls.subdomain}/create`, subdomain, { observe: 'response' });
  }

  uploadCSV(formData: FormData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': 'Bearer ' +  this.token,
      'cache-control': 'no-cache'
    });
    return this.http.post(`${this.serverUrl}${this.apiUrls.subdomain}/create/upload/file`, formData, { headers, observe: 'response'});
  }

  updateSubdomain(subdomain: SubDomain): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls.subdomain}/update/${subdomain.id}`, subdomain, { observe: 'response' });
  }

  getAllSubdomainsByDomain(domain: Domain){
    return this.http.get<SubDomain[]>(`${this.serverUrl}${this.apiUrls.subdomain}/get/domain/${domain}`, { headers: this.headers})
  }

  getSubdomain(subdomain:string, idDomain: string): Observable<Subdomain[]> {
    return this.http.get<Subdomain[]>(`${this.serverUrl}${this.apiUrls.subdomain}/get/${subdomain}/domain/${idDomain}`, {headers: this.headers});
  }
  //revisar este
  getSubdomains(idDomain: string): Observable<Subdomain[]> {
    return this.http.get<Subdomain[]>(`${this.serverUrl}${this.apiUrls.subdomain}/get/${idDomain}`, {headers: this.headers});
  }

  deleteSubdomain(id: string) {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrls.subdomain}/delete/${id}`, { headers: this.headers });
  }


}
