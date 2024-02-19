import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports:[
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class LoginComponent {
  hide = true;
  

  userProfile = new Array<any>();
  constructor(private authService: AuthService, private getUserProfile:AuthService) {

  }
  
  logIn(email: string, password: string) {
    this.authService.logInWithEmailAndPassword(email, password);
  }

  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }


  
}
