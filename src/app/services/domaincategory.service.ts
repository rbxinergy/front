import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomainCategory } from '../interfaces/domaincategory.interface';
import { environment } from 'src/environments/environment';
import { GroupCompanyService } from './groupcompany.service';
import { GroupcompanyDataService } from './groupcompany-data.service';

@Injectable({
  providedIn: 'root'
})
export class DomainCategoryService {
  groupDocument = '';
  private apiUrls = environment.apiUrls.domainCategory;
  private serverUrl = environment.serverUrl;
  token: string = sessionStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })
  groupCompany: any;

  constructor(private http: HttpClient, private groupCompanyService: GroupcompanyDataService) {
    this.groupDocument = sessionStorage?.getItem('groupDocument') || '0';
    this.groupCompany = this.groupCompanyService.getGroupCompanyData();
    console.log(this.groupCompany);
  }

  getDomainCategories(): Observable<DomainCategory[]> {
    return this.http.get<DomainCategory[]>(`${this.serverUrl}${this.apiUrls}/get/cliente1`, {headers: this.headers});
  }

  createDomainCategory(domainCategory: DomainCategory): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls}/create`, {domainCategory}, { observe: 'response' });
  }

  updateDomainCategory(domainCategory: DomainCategory): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls}/update`, {domainCategory}, { observe: 'response' });
  }

  deleteCompany(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrls}/delete/${id}`, { observe: 'response' });
  }
// async saveCompany(form: any):Promise<any>{
//   console.log(this.groupDocument)
//   const body = { 
//     "name": form.name,
//     "documentNumber": form.documentNumber,
//     "documentType": form.documentType,
//     "phone": form.phone,
//     "email": form.email,
//     "groupDocument": this.groupDocument,
//     "address":form.address,
//     "cityId": parseInt(form.cityId),
//     "stateId": parseInt(form.stateId),
//     "countryId": parseInt(form.countryId),
//     "isGroup": false
//   }
//   console.log(body)
//   const postCompany = this.http.post<Company>(`${this.serverUrl}${this.apiUrls.company}/create`, body, { headers: this.headers })

//   return await lastValueFrom(postCompany)  
// }

// getCompaniesByGroup(client: any){
//   const params = new HttpParams({
//     fromString: 'group=' + this.groupDocument + '&option=2'
//   });
//   return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrls.company}/get/cliente1`, { headers: this.headers})
// }

// getCompany(client: string, company: string) {
//   return this.http.get<Company>(`${this.serverUrl}${this.apiUrls.company}/get/${client}/${company}`, { headers: this.headers})
// }

// getClients() {
//   return of(clients);
//   // this.http.get<Company[]>(`${this.serverUrl}${this.apiUrls.company}/get/cliente1/company`, { headers: this.headers})
// }

// createCompany(company: Company): Observable<HttpResponse<any>> {
//   return this.http.post<any>(`${this.serverUrl}${this.apiUrls.company}/create`, {company}, { observe: 'response' });
// }

// updateCompany(company: Company): Observable<HttpResponse<any>> {
//   return this.http.put<any>(`${this.serverUrl}${this.apiUrls.company}/update`, {company}, { observe: 'response' });
// }

// deleteCompany(id: string): Observable<HttpResponse<any>> {
//   return this.http.delete<any>(`${this.serverUrl}${this.apiUrls.company}/delete/${id}`, { observe: 'response' });
// }



}




