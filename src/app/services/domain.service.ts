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
  serverUrl = environment.serverUrl;
  apiUrls = environment.apiUrls;

  token = sessionStorage.getItem('token')
  domains: any;
  domain:any;
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })
 


 constructor(private http: HttpClient, private domainDataService: DomainDataService) { 
    this.groupDocument = sessionStorage?.getItem('groupDocument') || '0';
    this.domain = this.domainDataService.getDomainData();
    console.log(this.domain);
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
    const postDomain = this.http.post<Domain>(`${this.serverUrl}${this.apiUrls.domain}/create`, body, { headers: this.headers })

    return await lastValueFrom(postDomain)  
  }

  getDomainsByCompany(domain: any){
    const params = new HttpParams({
      fromString: 'group=' + this.groupDocument + '&option=2'
    });
    return this.http.get<Domain[]>(`${this.serverUrl}${this.apiUrls.domain}/get/cliente1/company`, { headers: this.headers})
  }

  // TODO: trasladar a servicio de clientes
  getDomains() {
    return of(domains);
  }
  createDomain(domain: Domain): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls.domain}/create`, {domain}, { observe: 'response' });
  }

  updateDomain(domain: Domain): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls.domain}/update`, {domain}, { observe: 'response' });
  }

  deleteDomain(id: string): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls.domain}/delete/${id}`, { observe: 'response' });
  }
}
