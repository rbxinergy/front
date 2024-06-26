import { Injectable } from '@angular/core';
import { Domain } from '../interfaces/domain.interface';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, Subscription, catchError, lastValueFrom, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Domains } from '../shared/dummy-data/domain-client-company.dummy';
import { DomainDataService } from './domain-data.service';
import { domains } from '../shared/dummy-data/domains-client-company.dummy';
import { Company } from '../interfaces/company.interface';



@Injectable({
  providedIn: 'root'
})
export class DomainService {

  groupDocument = '';
  domains: any;
  domain:any;
  private apiUrls = environment.apiUrls.domain;
  private serverUrl = environment.serverUrl;
  token: string = sessionStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  constructor(private http: HttpClient, private domainDataService: DomainDataService) { 
     this.groupDocument = sessionStorage?.getItem('groupDocument') || '0';
     this.domain = this.domainDataService.getDomainData();
     console.log(this.domain);
   }

  getDomains(): Observable<Domain[]> {
    console.log(`${this.serverUrl}${this.apiUrls}/domain/get/cliente1/company`);
    return this.http.get<Domain[]>(`${this.serverUrl}${this.apiUrls}/get/cliente1/company`, {headers: this.headers});

  }


  async saveDomain(form: any):Promise<any>{
    console.log(this.groupDocument)
    const body = { 
      "name": form.name,
      "description": form.description,
      "code": form.code,
      "tag": form.tag,
      "idDomainCategory": form.idDomainCategory,
      "groupDocument": this.groupDocument,
      "idCompany":form.idCompany,
    }
    console.log(body)
    const postDomain = this.http.post<Domain>(`${this.serverUrl}${this.apiUrls}/create`, body, { headers: this.headers })

    return await lastValueFrom(postDomain)  
  }

  getDomainsByCompany(domain: any){
    const params = new HttpParams({
      fromString: 'group=' + this.groupDocument + '&option=2'
    });
    return this.http.get<Domain[]>(`${this.serverUrl}${this.apiUrls}/get/cliente1/company`, { headers: this.headers})
  }


  createDomain(domain: Domain): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls}/create`, {domain}, { observe: 'response' });
  }

  updateDomain(domain: Domain): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls}/update`, {domain}, { observe: 'response' });
  }

  deleteDomain(id: string): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls}/delete/${id}`, { observe: 'response' });
  }
}
