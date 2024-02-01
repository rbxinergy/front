import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

   
  constructor(private http: HttpClient) {  }

  token = localStorage.getItem('token')
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token
  })


  async saveCompany(form: any):Promise<any>{


    // const url : string = environment.postClientUrl
    const url = 'http://localhost:8081/post-client/api/post-client'
   
    const name: string = ''
    const documentNumber:string = ''
    const documentType: string = ''
    const phone: string = ''
    const email: string = ''
    const addres: string = ''
    const cityId: number = 0
    const stateId: number = 0
    const countryId: number = 0
    const clientName: string = ''
 
    
    const body = { 
      "name": form.name,
      "documentNumber": form.documentNumber,
      "documentType": form.documentType,
      "phone": form.phone,
      "email": form.email,
      // "groupDocument": form.documentNumber,
      "address":form.address,
      "cityId": parseInt(form.cityId),
      "stateId": parseInt(form.stateId),
      "countryId": parseInt(form.countryId),
      "isGroup": false
    }
    
    const groupDocument = sessionStorage.getItem('groupDocument')
    console.log(groupDocument)
    form.groupDocument = groupDocument
    
    console.log(this.token)
    console.log(body)
    // const postCompany = this.http.post<any>(url, body, { headers: this.headers })

    // return await lastValueFrom(postCompany)  
  }
}
