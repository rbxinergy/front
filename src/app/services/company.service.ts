import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clients, companies } from '../shared/dummy-data/client-company.dummy';
import { Company } from '../interfaces/company.interface';
import { ClientDataService } from './client-data.service';
import { ServiceCompany } from '../interfaces/servicecompany.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  groupDocument = '';
  serverUrl = environment.serverUrl;
  apiUrls = environment.apiUrls;

  token = sessionStorage.getItem('token')
  client: any;
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })

  constructor(private http: HttpClient, private clientDataService: ClientDataService) { 
    this.groupDocument = sessionStorage?.getItem('groupDocument') || '0';
    this.client = this.clientDataService.getClientData();
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
    const params = new HttpParams({
      fromString: 'group=' + this.groupDocument + '&option=2'
    });
    return this.http.get<Company[]>(`${this.serverUrl}${this.apiUrls.company}/get/cliente1/company`, { headers: this.headers})
  }

  getCompanies() {
    return of(companies);
  }

  // TODO: trasladar a servicio de clientes
  getClients() {
    return of(clients);
  }

  createCompany(company: Company): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.serverUrl}${this.apiUrls.company}/create`, {company}, { observe: 'response' });
  }

  updateCompany(company: Company): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls.company}/update`, {company}, { observe: 'response' });
  }

  deleteCompany(id: string): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.serverUrl}${this.apiUrls.company}/delete/${id}`, { observe: 'response' });
  }
}
