import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {  }

  token = sessionStorage.getItem('token')
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token,
    'cache-control': 'no-cache'
  })
  groupDocument = sessionStorage.getItem('groupDocument')
  url = environment.getCompanyUrl

  async saveCompany(form: any):Promise<any>{
    const url = environment.postClientUrl
    // const name: string = ''
    // const documentNumber:string = ''
    // const documentType: string = ''
    // const phone: string = ''
    // const email: string = ''
    // const groupDocument: string = ''
    // const addres: string = ''
    // const cityId: number = 0
    // const stateId: number = 0
    // const countryId: number = 0
    // const clientName: string = ''
    
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

  getCompany(){
    const params = new HttpParams({
      fromString: 'group=' + this.groupDocument + '&option=2'
    })
    return this.http.get<any>(this.url, { headers: this.headers , params})
  }

  getCompanies(){
    return this.http.get<any>(this.url, { headers: this.headers })
  }

  getClients(){
    const params = new HttpParams({
      fromString: 'option=1' 
    })
    return this.http.get<any>(this.url, { headers: this.headers, params })
  }

}
