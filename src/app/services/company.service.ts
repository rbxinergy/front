import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clients, companies } from '../shared/dummy-data/client-company.dummy';
import { Company } from '../interfaces/company.interface';
import { ClientDataService } from './client-data.service';
import { ServiceCompany } from '../interfaces/servicecompany.interface';
import { GroupcompanyDataService } from './groupcompany-data.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  groupDocument = '';
  serverUrl = environment.serverUrl;
  apiUrls = environment.apiUrls;

  token = sessionStorage.getItem('token')
  client: any;
  groupCompany: any
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  constructor(private http: HttpClient, private clientDataService: ClientDataService, private groupCompanyDataService: GroupcompanyDataService) { 
    this.groupDocument = sessionStorage?.getItem('groupDocument') || '0';
    this.client = this.clientDataService.getClientData();
    this.groupCompany = this.groupCompanyDataService.getGroupCompanyData();
    console.log(this.client);
  }

  async saveCompany(form: any):Promise<any>{
    console.log(this.groupDocument)
    const body = { 
      "name": form.name,
      "documentNumber": form.documentNumber,
      "documentType": form.documentType,
      "phone": form.phone,
      "email": form.email,
      "groupDocument": this.groupDocument,
      "address":form.address,
      "cityId": parseInt(form.cityId),
      "stateId": parseInt(form.stateId),
      "countryId": parseInt(form.countryId),
      "isGroup": false
    }
    console.log(body)
    const postCompany = this.http.post<Company>(`${this.serverUrl}${this.apiUrls.company}/create`, body, { headers: this.headers })

    return await lastValueFrom(postCompany)  
  }

  getCompaniesByGroup(client: any){
    console.log('getCompaniesByGroup', client);
    const params = new HttpParams({
      fromString: 'group=' + this.groupDocument + '&option=2'
    });
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrls.company}/get/${client}`, { headers: this.headers})
  }

  getCompany(client: string, company: string) {
    console.log('getCompany', client, company);
    return this.http.get<Company>(`${this.serverUrl}${this.apiUrls.company}/get/${client}/${company}`, { headers: this.headers})
  }

  getClients() {
    return of(clients);
    // this.http.get<Company[]>(`${this.serverUrl}${this.apiUrls.company}/get/cliente1/company`, { headers: this.headers})
  }

  createCompany(company: Company): Observable<HttpResponse<any>> {
    console.log(company)
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls.company}/create`, company, { observe: 'response' });
  }


  updateCompany(company: Company): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls.company}/update`, {company}, { observe: 'response' });
  }

  deleteCompany(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.serverUrl}${this.apiUrls.company}/delete/${id}`, { observe: 'response' });
  }
}
