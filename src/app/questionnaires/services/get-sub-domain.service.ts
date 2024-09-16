import { Injectable } from '@angular/core';
import { CompanySubDomain } from '../interfaces/subdomain.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetSubDomainService {
  constructor(private http: HttpClient) {}

  getData(id: number): Observable<any> {
    // const token = sessionStorage.getItem('token');

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' +  token,
    //   'Cache-Control': 'no-cache'
    // });

    // const params = new HttpParams({
    //   fromString: `id=${id}`
    // })
    // return this.http.get<CompanySubDomain>(environment.apiGetAllSubdomain, {headers, params});
    const response = [
      {
        idSubDomain: 3,
        subDomain: 'Cloud Privada DUMMY',
        idDomain: 35,
        domainName: 'Seguridad digital',
        companyId: 27,
        companyName: 'Compañía Minera del Pacífico',
        clientName: 'Grupo CAP',
      },
      {
        idSubDomain: 4,
        subDomain: 'Control de acceso',
        idDomain: 35,
        domainName: 'Seguridad digital',
        companyId: 27,
        companyName: 'Compañía Minera del Pacífico',
        clientName: 'Grupo CAP',
      },
      {
        idSubDomain: 5,
        subDomain: 'Datos clientes',
        idDomain: 39,
        domainName: 'Seguridad de datos',
        companyId: 27,
        companyName: 'Compañía Minera del Pacífico',
        clientName: 'Grupo CAP',
      },
      {
        idSubDomain: 6,
        subDomain: 'Datos sencibles',
        idDomain: 39,
        domainName: 'Seguridad de datos',
        companyId: 27,
        companyName: 'Compañía Minera del Pacífico',
        clientName: 'Grupo CAP',
      },
      {
        idSubDomain: 7,
        subDomain: 'Infraestructura',
        idDomain: 38,
        domainName: 'Continuidad de operaciones',
        companyId: 27,
        companyName: 'Compañía Minera del Pacífico',
        clientName: 'Grupo CAP',
      },
      {
        idSubDomain: 8,
        subDomain: 'Test sub domain',
        idDomain: 38,
        domainName: 'Continuidad de operaciones',
        companyId: 27,
        companyName: 'Compañía Minera del Pacífico',
        clientName: 'Grupo CAP',
      },
      {
        idSubDomain: 10,
        subDomain: 'Test upd',
        idDomain: 38,
        domainName: 'Continuidad de operaciones',
        companyId: 27,
        companyName: 'Compañía Minera del Pacífico',
        clientName: 'Grupo CAP',
      },
      {
        idSubDomain: 12,
        subDomain: 'Test Paulina UPD',
        idDomain: 38,
        domainName: 'Continuidad de operaciones',
        companyId: 27,
        companyName: 'Compañía Minera del Pacífico',
        clientName: 'Grupo CAP',
      },
      {
        idSubDomain: 15,
        subDomain: 'Testing',
        idDomain: 37,
        domainName: 'Seguridad legal',
        companyId: 27,
        companyName: 'Compañía Minera del Pacífico',
        clientName: 'Grupo CAP',
      },
      {
        idSubDomain: 16,
        subDomain: 'Datos UPD',
        idDomain: 35,
        domainName: 'Seguridad digital',
        companyId: 27,
        companyName: 'Compañía Minera del Pacífico',
        clientName: 'Grupo CAP',
      },
    ];
    return of(response);
  }
}
