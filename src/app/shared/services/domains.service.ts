import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DomainsService {
  
  constructor(private http: HttpClient) {  }

  token = sessionStorage.getItem('token')

  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  async postDomain(form: any):Promise<any>{
    const url = environment.postDomainUrl
    const body = { 
      "name": form.name,
      "description": form.description,
      "idDomainType": parseInt(form.idDomainType),
      "documentGroup": form.documentGroup
    }

    console.log(body)

    const postDomain = this.http.post<any>(url, body, { headers: this.headers })
    return await lastValueFrom(postDomain)  
  
  }

  getDomains(): Observable<any>{
    const url = environment.getDomainsUrl
    return this.http.get<any>(url, { headers: this.headers })
  }
  getDomainsType(): Observable<any>{
    const url = environment.getDomainTypeUrl
    return this.http.get<any>(url, { headers: this.headers })
  }
  getDomainGroup(): Observable<any>{
    const url = environment.getDomainGrpUrl
    const groupDocument = sessionStorage.getItem('groupDocument')
    
    const params = new HttpParams({
      fromString: 'groupDocument=' + groupDocument
    })

    return this.http.get<any>(url, { headers: this.headers , params})
  }

}
