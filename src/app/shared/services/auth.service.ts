import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(private router: Router, private http: HttpClient) { }
  
  async logInWithEmailAndPassword(email: string, password: string): Promise<any> {
    const apiUrls = environment.apiUrls;
    const serverUrl = environment.serverUrl;

    try {
      const response: any = await this.http.post(
        `${serverUrl}${apiUrls.login}`,
        { email, password }
      ).toPromise();
      sessionStorage.setItem('user', response.email);
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('client', response.client);
      sessionStorage.setItem('company', response.company);
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      return Promise.reject(error);
    }
  }

  get isLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    return user !== null;
  }

  async logOut(): Promise<void> {
    const apiUrls = environment.apiUrls;
    const serverUrl = environment.serverUrl;

    try {
      await this.http.delete(`${serverUrl}${apiUrls.logout}`, {}).toPromise();
      localStorage.removeItem('user');
      sessionStorage.removeItem('groupDocument');
      sessionStorage.removeItem('userCreator');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('profile');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('client');
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Error during logout:', error);
      return Promise.reject(error);
    }
  }
}