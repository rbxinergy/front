import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clients, companies } from '../dummy-data/client-company.dummy';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private groupDocument: string = '';

  constructor(private http: HttpClient) { 
    this.groupDocument = sessionStorage?.getItem('groupDocument') || '0'
  }

  token = sessionStorage.getItem('token')
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })
  

  url = environment.getCompanyUrl
  url2 = environment.putClientUrl

  async saveCompany(form: any):Promise<any>{
    const url = environment.postClientUrl
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
    const postCompany = this.http.post<any>(url, body, { headers: this.headers })

    return await lastValueFrom(postCompany)  
  }

  getCompaniesByGroup(){
    const params = new HttpParams({
      fromString: 'group=' + this.groupDocument + '&option=2'
    })
    return this.http.get<any>(this.url, { headers: this.headers , params})
  }

  getCompanies() {
    return of(companies);
  }

  getClients() {
    return of(clients);
  }

  putClient(form: any){
    console.log(form)
    const body = {
      "id":form.id,
      "address":form.address,
      "phone":form.phone,
      "email":form.email,
      "cityId":form.cityId,
      "stateId":form.stateId,
      "countryId":form.countryId
    }
    console.log(this.url2, body)
    return this.http.put<any>(this.url2, body, { headers: this.headers })
  }

}
