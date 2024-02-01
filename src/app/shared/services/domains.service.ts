import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, lastValueFrom, map } from 'rxjs';
import { DomainsComponent } from 'src/app/components/dashboard/stepper/domains/domains.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DomainsService {
  
  constructor(private http: HttpClient) {  }

  token = localStorage.getItem('token')

  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token
  })

  async postDomain(form: any):Promise<any>{
    const url = 'http://localhost:8082/post-domain/api/post-domain'
   
    const body = { 
      "name": form.name,
      "description": form.description,
      "idDomainType": parseInt(form.idDomainType),
      "documentGroup": form.documentGroup
    }
    
    const postDomain = this.http.post<any>(url, body, { headers: this.headers })

    return await lastValueFrom(postDomain)  
  
  }
 
  getDomainsType(): Observable<any>{
    // const url = 'https://get-domain-type-ehqivncgha-uc.a.run.app/get-domain-type/api/get-domain-type'
    const url = 'http://localhost:9000/get-domain-type/api/get-domain-type'
    return this.http.get<any>(url, { headers: this.headers })
  }
  getDomainGroup(): Observable<any>{
    const url = 'http://localhost:8084/get-domain-grp/api/get-domain-grp'
    // const url = 'https://get-domain-grp-ehqivncgha-uc.a.run.app/get-domain-grp/api/get-domain-grp'
    const documentNumber = sessionStorage.getItem('documentNumber')
    console.log(documentNumber)
    const params = new HttpParams({
      fromString: 'groupDocument=' + documentNumber
    })
     
    console.log(params)
    console.log(url, { headers: this.headers ,  params})
    return this.http.get<any>(url, { headers: this.headers , params})
  }

}
