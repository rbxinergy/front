import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientSelectionDialogComponent } from '../client-selection-dialog/client-selection-dialog.component';

/**
 * Componente de inicio de sesión.
 * Este componente maneja la lógica de inicio de sesión y la navegación posterior.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  /** Indica si el campo de contraseña está oculto. */
  hide = true;

  /** Perfil del usuario. */
  userProfile :any;

  /**
   * Constructor del componente.
   * @param authService Servicio de autenticación.
   * @param router Servicio de enrutamiento.
   * @param dialog Servicio de diálogo.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  /**
   * Maneja el inicio de sesión del usuario.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   */

  async logIn(email: string, password: string) {
   
    try {
      const data = await this.authService.logInWithEmailAndPassword(email, password);
      console.log("DATA", data);
      sessionStorage.setItem('client', Array.isArray(data.permissions?.client) ? JSON.stringify(data.permissions?.client) : data.permissions?.client);
      const profile = {
        firstName: data.name,
        lastName: data.lastName,
        email: data.email
      }
      sessionStorage.setItem('profile', JSON.stringify(profile));
      sessionStorage.setItem('client', data.permissions[0].client);
      sessionStorage.setItem('clientName', data.permissions[0].clientName);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log("ERROR", error);
      this.dialog.open(MessagesModalComponent, {
        data: {
          message: 'Error en inicio de sesión. Intente nuevamente.',
          type: 'error'
        }
      });
    }
  }
}
