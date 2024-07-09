import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Leer el token desde sessionStorage
    const token = sessionStorage.getItem('token');

    // Clonar la solicitud y agregar la cabecera 'token' si el token existe
    const authReq = token ? request.clone({
      setHeaders: { 'authorization': 'Bearer ' + token }
    }) : request;

    // Pasar la solicitud clonada al siguiente manejador
    return next.handle(authReq);
  }
}