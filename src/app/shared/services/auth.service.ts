import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GetprofileService } from './getprofile.service';
import { of } from 'rxjs';


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
    // const result = await this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
    const result = JSON.parse(`{
      "email": "armin_devel@outlook.com",
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaW1vLm1vcmFsZXNnQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IiIsImxhc3ROYW1lIjoiIiwicm9sZSI6InJvbGUteGluZXJneS1hbGwtYWxsIiwiZXhwIjoxOTMxNDU4NjIxfQ.cg8w3k7kn2KS1tsn0zrf_vjyA_3Pq3b92wbKL0m3YVtta496YxZ4hCYvfAeZbeHR2Hvf0NyaQZmhMyKe1S5AL"
    }`);
    // const token  = await result.user?.getIdToken() || ''
    const token = result.token;
    sessionStorage.setItem('token',token)
    sessionStorage.setItem('user',JSON.stringify(result.email))

    // MOCKUP OBJECT: Retorna desde servicio /role/get/{client}/{company}
    const roles = `[{
      "role": "role-xynergy-xynergy-all",
      "description": "12345",
      "isCreate": true,
      "isUpdate": true,
      "isRead": true,
      "isDelete": true,
      "tag": "legal-related"
    }]`;

    // MOCKUP OBJECT: Retorna desde servicio /company/get/{client}/{company}
    const companies = `[
        {
          "id": "550e8400-e29b-41d4-a716-446655440000",
          "name": "Xinergy SPA.",
          "businessName": "12345",
          "address": "unknown address 1111",
          "country": "unknown country",
          "documentType": "12345",
          "document": "12345",
          "isHeadQuarters": true,
          "isBranch": true,
          "tag": "legal-related",
          "idClient": "550e8400-e29b-41d4-a716-446655440000",
          "idGroupCompany": "550e8400-e29b-41d4-a716-446655440000",
          "idContact": [
            "550e8400-e29b-41d4-a716-446655440000"
          ]
        }
      ]`;
      // MOCKUP OBJECT
      const profile = JSON.parse(`{
          "email":"armin_devel@outlook.com",
          "firstName":"Armin",
          "lastName":"Vera",
          "isActive":true,
          "isAdmin":true,
          "isProvider":false,
          "isClient":true,
          "id":42,
          "company": ${companies},
          "roles": ${roles}
      }`);
      console.log('PROFILE: ', profile);
      sessionStorage.setItem('user-profile', JSON.stringify(profile));
      sessionStorage.setItem('company', JSON.stringify(profile.company[0]));
      console.log('LOGIN RESULT', result);
      return of(result);

    // const profile = await this.getProfileService.getUserProfile(email);
    // sessionStorage.setItem('profile', JSON.stringify(profile))
    // const {id, email: userCreator } = profile
    // sessionStorage.setItem('userId', id)
    // sessionStorage.setItem('userCreator', userCreator)
    // console.log(userCreator)

    // return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password) 

    // .then((userCredential) => {
    //   // console.log(userCredential.user?.getIdToken())
    //   this.userData = userCredential.user
    //   this.observeUserState()
    // })
    // .catch((error) => {
    //   alert(error.message);
    // })
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
  async signUpWithEmailAndPassword(email: string, password: string) {
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
