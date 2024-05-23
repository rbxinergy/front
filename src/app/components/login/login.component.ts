import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GetProfileService } from 'src/app/get-profile.service';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports:[
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ]
})
export class LoginComponent {
  hide = true;
  

  userProfile = new Array<any>();
  constructor(private authService: AuthService, private getUserProfile: GetProfileService,
    private router: Router, public dialog: MatDialog) {

  }
  
  logIn(email: string, password: string) {
    // this.authService.logInWithEmailAndPassword(email, password).subscribe((data: any) =>{
    //   this.router.navigate(['/home']);
    // }, (error) => {
    //   console.log(error);
    //   this.showDialog('500ms', '500ms', 'Error en el proceso de autenticación. Intente nuevamente', 'error');
    // });
    // this.authService.logInWithEmailAndPassword(email, password);
  }
  showDialog(enterAnimationDuration: string, exitAnimationDuration: string, message: string, type: string): void {
    this.dialog.open(MessagesModalComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        message,
        type
      }
    });
  }

  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }


  
}
