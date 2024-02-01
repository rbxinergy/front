import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  
  constructor(private http: HttpClient) {  }

  token = localStorage.getItem('token')
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +  this.token
  })

  async getClient():Promise<any>{

    const url = 'https://get-clients-ehqivncgha-uc.a.run.app/get-clients/api/get-clients'
    const getClient = this.http.get<any>(url, { headers: this.headers })
   
    return await lastValueFrom(getClient)  
  }

  async saveClient(form: any):Promise<any>{


    // const url : string = environment.postClientUrl
    this.getClient()
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
      "groupDocument": form.documentNumber,
      "address":form.address,
      "cityId": parseInt(form.cityId),
      "stateId": parseInt(form.stateId),
      "countryId": parseInt(form.countryId),
      "clientName": form.clientName,
      "isGroup": true
    }
    console.log(this.token)
    console.log(body)
    // guardo el documentNumber y se lo paso al domains.service para poder guardar el postDomain
    const id = form.documentNumber
    sessionStorage.setItem('documentNumber', id)

    const postClient = this.http.post<any>(url, body, { headers: this.headers })

    return await lastValueFrom(postClient)  
  
  }
 


}
