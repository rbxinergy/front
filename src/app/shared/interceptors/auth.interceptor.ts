import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor de autenticación.
 * Este interceptor añade el token de autenticación a todas las solicitudes HTTP.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Intercepta las solicitudes HTTP y añade el token de autenticación.
   * @param req La solicitud HTTP original.
   * @param next El siguiente manejador en la cadena de interceptores.
   * @returns Un observable de eventos HTTP.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { 
    if(request.url.includes('/auth/login')){
      return next.handle(request);
    }
    const token = sessionStorage.getItem('token');

    const authReq = token ? request.clone({
      setHeaders: { 'authorization': 'Bearer ' + token }
    }) : request;

    return next.handle(authReq);
  }
}