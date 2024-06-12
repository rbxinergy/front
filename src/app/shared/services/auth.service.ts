import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GetprofileService } from './getprofile.service';


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
  async logInWithEmailAndPassword(email: string, password: string) {
    if (password === '1234') {
      return Promise.reject({
        httpStatus: 'UNAUTHORIZED',
        message: 'Invalid username or password'
      });
    }

    const dummyResponse = {
      email: 'john@email.com',
      client: 'client',
      company: 'company',
      isCreate: true,
      isUpdate: true,
      isRead: true,
      isDelete: true,
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaW1vLm1vcmFsZXNnQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IiIsImxhc3ROYW1lIjoiIiwicm9sZSI6InJvbGUteGluZXJneS1hbGwtYWxsIiwiZXhwIjoxOTMxNDU4NjIxfQ.cg8w3k7kn2KS1tsn0zrf_vjyA_3Pq3b92wbKL0m3YVtta496YxZ4hCYvfAeZbeHR2Hvf0NyaQZmhMyKe1S5AL'
    };

    localStorage.setItem('user', JSON.stringify(dummyResponse));
    sessionStorage.setItem('token', dummyResponse.token);
    const profile = await this.getProfileService.getUserProfile(email);
    sessionStorage.setItem('profile', JSON.stringify(profile));
    const { id, email: userCreator } = profile;
    sessionStorage.setItem('userId', id);
    sessionStorage.setItem('userCreator', userCreator);
    console.log(userCreator);

    return Promise.resolve(dummyResponse);
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
  async logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      sessionStorage.removeItem('groupDocument');
      sessionStorage.removeItem('userCreator');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('profile');
      sessionStorage.removeItem('token');
      this.router.navigate(['login']);
    })
  }

}