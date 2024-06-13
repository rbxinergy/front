import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports:[
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  hide = true;
  

  userProfile = new Array<any>();
  constructor(private authService: AuthService, private getUserProfile:AuthService,
    private router: Router,public dialog: MatDialog) { }
  
  logIn(email: string, password: string) {
    this.authService.logInWithEmailAndPassword(email, password)
    .then(() => {
      this.router.navigate(['/dashboard']);
    })
    .catch((error) => {
      this.dialog.open(MessagesModalComponent, {
        data: {
          message: 'Error en inicio de sesión. Intente nuevamente.',
          type: 'error'
        }
      });
    });
  }

  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }


  
}
