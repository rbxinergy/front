import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio de autenticación.
 * Este servicio maneja la lógica de autenticación y la gestión de sesiones.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Datos del usuario autenticado. */
  userData: any;
  apiUrls: any = environment.apiUrls;
  serverUrl: any = environment.serverUrl;

  /**
   * Constructor del servicio de autenticación.
   * @param router Servicio de enrutamiento.
   * @param http Cliente HTTP para realizar solicitudes.
   */
  constructor(private router: Router,private http: HttpClient) {}

  /**
   * Inicia sesión con correo electrónico y contraseña.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Una promesa que se resuelve con los datos del usuario autenticado.
   */
  async logInWithEmailAndPassword(email: string, password: string): Promise<any> {
    try {
      const response: any = await this.http.post(
        `${this.serverUrl}${this.apiUrls.login}`,
        { email, password }
      ).toPromise();
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      return Promise.reject(error);
    }
  }

  /**
   * Cierra la sesión del usuario.
   */
  async logOut(): Promise<void> {
    try {
      await this.http.delete(`${this.serverUrl}${this.apiUrls.logout}`, {}).toPromise();
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

  /**
   * Verifica si el usuario está autenticado.
   * @returns `true` si el usuario está autenticado, `false` en caso contrario.
   * Este método es invocado por AuthGuard para verificar si el usuario está autenticado.
   * Si no está autenticado, redirige al usuario a la página de inicio de sesión.
   */
  get isLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    return user !== null;
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