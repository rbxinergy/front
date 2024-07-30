import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  apiUrls: any = environment.apiUrls;
  serverUrl: any = environment.serverUrl;
  isAuth: boolean = false;

  constructor(private router: Router, private http: HttpClient) { }
  
  async logInWithEmailAndPassword(email: string, password: string): Promise<any> {
    try {
      const response: any = await this.http.post(
        `${this.serverUrl}${this.apiUrls.login}`,
        { email, password }
      ).toPromise();
      sessionStorage.setItem('user', response.email);
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('client', response.client);
      sessionStorage.setItem('company', response.company);
      sessionStorage.setItem('session', response.session);
      this.isAuth = true;
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      return Promise.reject(error);
    }
  }

  isLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    this.isAuth = !user ? false : true;
    console.log("isLoggedIn", this.isAuth);
    return this.isAuth;
  }

  isActive(): Observable<boolean> {
    const sessionId = sessionStorage.getItem('session');
    if (!sessionId) {
      return of(false);
    }
    return this.http.get<{active: boolean}>(`${this.serverUrl}${this.apiUrls.session}/${sessionId}`, { observe: 'response' }).pipe(
      map(response => response.body?.active === true), // Convertir la respuesta en boolean
      catchError(() => of(false)) // En caso de error, devolver false
    );
  }

  async logOut(): Promise<void> {
    try {
      await this.http.delete(`${this.serverUrl}${this.apiUrls.logout}`, {}).toPromise();
      sessionStorage.clear();
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Error during logout:', error);
      return Promise.reject(error);
    }
  }

  async getProfile() {
    try {
      // const user = sessionStorage.getItem('user');
      const client = sessionStorage.getItem('client');
      const company = sessionStorage.getItem('company');
      //return await this.http.get(`${this.serverUrl}${this.apiUrls.user}/get/${client}/${company}`).toPromise();
      return {
        firstName: "Armin",
        lastName: "Vera",
        email: "armin.vera@gmail.com",
      }
    } catch (error) {
      console.error('Error during getProfile:', error);
      return Promise.reject(error);
    }
  }
}