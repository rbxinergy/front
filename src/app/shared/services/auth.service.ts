import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GetprofileService } from './getprofile.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private getProfileService: GetprofileService,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
  ) {
    // OBSERVER save user in localStorage (log-in) and setting up null when log-out
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        const token = user?.getIdToken()
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    })
  }

  // log-in with email and password
  async logInWithEmailAndPassword(email: string, password: string): Promise<any> {
    if (password === '1234') {
      return Promise.reject({
        httpStatus: 'UNAUTHORIZED',
        message: 'Invalid username or password'
      });
    }

    const apiUrls = environment.apiUrls;
    const serverUrl = environment.serverUrl;

    try {
      const response: any = await this.http.post(`${serverUrl}${apiUrls.login}`, { email, password }).toPromise();
      console.log('login:', response);
      localStorage.setItem('user', JSON.stringify(response));
      sessionStorage.setItem('token', response.token);

      const profile = await this.getProfileService.getUserProfile(email);
      sessionStorage.setItem('profile', JSON.stringify(profile));
      const { id, email: userCreator } = profile;
      sessionStorage.setItem('userId', id);
      sessionStorage.setItem('userCreator', userCreator);
      const clients = Array.isArray(response.client) ? response.client : [response.client];

      return { profile, clients };
    } catch (error) {
      console.error('Error during login:', error);
      return Promise.reject(error);
    }
  }


  // log-in with google
  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then(() => this.observeUserState())
      .catch((error: Error) => {
        alert(error.message);
      })
  }

  // sign-up with email and password
  signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard/stepper']))
    })
  }

  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }



  // logOut
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