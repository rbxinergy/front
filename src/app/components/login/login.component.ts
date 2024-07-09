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
import { ClientSelectionDialogComponent } from '../client-selection-dialog/client-selection-dialog.component';



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

  constructor(private authService: AuthService,
    private router: Router,public dialog: MatDialog) { }
  
  async logIn(email: string, password: string) {
    try {
      const data = await this.authService.logInWithEmailAndPassword(email, password);
      console.log("DATA LOGIN", data);
      sessionStorage.setItem('client', Array.isArray(data.client) ? JSON.stringify(data.client) : data.client);
      sessionStorage.setItem('company', Array.isArray(data.company) ? JSON.stringify(data.company) : data.company);
      if (Array.isArray(data.client)) {
        const dialogRef = this.dialog.open(ClientSelectionDialogComponent, {
          data: { clients: data.client }
        });
  
        dialogRef.afterClosed().subscribe({
          next: (selectedClient) => {
            if (selectedClient) {
              console.log("selectedClient", selectedClient);
            }
            console.log("to dashboard after dialog");
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Error closing dialog:', err);
          }
        });
      } else {
        console.log("to dashboard");
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      this.dialog.open(MessagesModalComponent, {
        data: {
          message: 'Error en inicio de sesión. Intente nuevamente.',
          type: 'error'
        }
      });
    }
  }

  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }
}
