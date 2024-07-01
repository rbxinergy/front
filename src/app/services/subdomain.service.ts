import { Injectable } from '@angular/core';
import { Subdomain } from '../interfaces/subdomain.interface';
import { SubDomain } from '../interfaces/domain.interface';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, Subscription, catchError, lastValueFrom, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubdomainDataService } from './subdomain-data.service';
import { subdomains } from '../shared/dummy-data/subdomains-domain.dummy';

@Injectable({
  providedIn: 'root'
})

export class SubdomainService {
  groupDocument = '';
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
    this.groupDocument = sessionStorage?.getItem('groupDocument') || '0';
    this.subdomain = this.subdomainDataService.getDomainData();
    console.log(this.subdomain);
  }

  getSubdomains(): Observable<Subdomain[]> {
    return this.http.get<Subdomain[]>(`${this.serverUrl}${this.apiUrls}/get/cliente1`, {headers: this.headers});
  }

  async saveSubdomain(form: any):Promise<any>{
    console.log(this.groupDocument)
    const body = { 
      "name": form.name,
      "description": form.description,
      "tag": form.tag,
      "idDomain": form.idDomain,
      "groupDocument": this.groupDocument
    }
    console.log(body)
    const postSubdomain = this.http.post<SubDomain>(`${this.serverUrl}${this.apiUrls.subdomain}/create`, body, { headers: this.headers })

    return await lastValueFrom(postSubdomain)  
  }

  getSubdomainsByDomain(subdomain: any){
    const params = new HttpParams({
      fromString: 'group=' + this.groupDocument + '&option=2'
    });
    return this.http.get<SubDomain[]>(`${this.serverUrl}${this.apiUrls.subdomain}/get/cliente1/company`, { headers: this.headers})
  }

  // createSubdomain(subdomain: Subdomain): Observable<Subdomain> {
  //   return this.http.post<Subdomain>(`${this.serverUrl}${this.apiUrls}/create`, subdomain, {headers: this.headers});

  // }
  createSubdomain(subdomain: SubDomain): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls.subdomain}/create`, {subdomain}, { observe: 'response' });
  }

  updateSubdomain(subdomain: SubDomain): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls.subdomain}/update`, {subdomain}, { observe: 'response' });
  }

  deleteSubdomain(id: string): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls.subdomain}/delete/${id}`, { observe: 'response' });
  }
}
