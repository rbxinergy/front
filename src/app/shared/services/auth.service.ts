import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ModulePermissions, User } from 'src/app/interfaces/role.interface';


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
  isAuth: boolean = false;
  private currentUser: User | null = null;
  private permittedModules: string[] = [];
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

      sessionStorage.setItem('user', JSON.stringify(response));
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('client', response.permissions[0].client);
      sessionStorage.setItem('session', response.session);
      this.isAuth = true;
      const modules = response.permissions[0].company.consolidateRole.modules;
      const modulesArray = Object.entries(modules).map(([moduleName, actions]) => ({
        module: moduleName,
        actions: Object.entries(actions).map(([actionName, action]) => ({
          action: actionName,
          values: action
        }))
      }));

      sessionStorage.setItem('modules', JSON.stringify(modulesArray));
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  extractPermittedModules(modules: any[]): string[] {
    const modulesArray = modules.map((module: any) => {
      return module.module;
    });
    return modulesArray;
  }

  getPermittedModules(): string[] {
    return this.permittedModules;
  }

  /**
   * Cierra la sesión del usuario.
   */
  isLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    this.isAuth = !user ? false : true;
    return this.isAuth;
  }

  isActive(): Observable<boolean> {
    const sessionId = sessionStorage.getItem('session');
    if (!sessionId) {
      return of(false);
    }
    return this.http.get<{active: boolean}>(`${this.serverUrl}${this.apiUrls.session}/${sessionId}`, { observe: 'response' }).pipe(
      map(response => response.body?.active === true), 
      catchError(() => of(false)) 
    );
  }

  async logOut(): Promise<void> {
    try {
      await this.http.delete(`${this.serverUrl}${this.apiUrls.logout}`, {}).toPromise();
      this.router.navigate(['login']);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      sessionStorage.clear();
    }
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const user = sessionStorage.getItem('user');
      this.currentUser = user ? JSON.parse(user) : null;
    }
    return this.currentUser;
  }

  hasPermission(module: string, action: keyof ModulePermissions): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    for (const permission of user.permissions) {
      for (const company of permission.companies) {
        for (const role of company.roles) {
          if (role.modules[module] && role.modules[module][action]) {
            return true;
          }
        }
      }
    }
    return false;
  }
}