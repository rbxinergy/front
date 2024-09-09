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
      const response1 = {
          "name": "Armin",
          "lastName": "Vera",
          "email": "armin.vera@xinergy.cl",
          "permissions": [
              {
                  "client": "2bb1b180-1c6f-4c94-8526-0d1bec54acd6",
                  "clientName": "Grupo Austral",
                  "accessType": "xinergy",
                  "companies": [
                      {
                          "company": "4995c9b2-1e34-4384-9143-68d6d1c3eca0",
                          "accessType": "xinergy",
                          "roles": [
                              {
                                  "roleName": "Role gestion",
                                  "roleID": "34563789iouygjhfjkl",
                                  "modules": {
                                    "dominio": {
                                        "create": true,
                                        "read": true,
                                        "update": true,
                                        "delete": true
                                    },
                                    "sub-dominio": {
                                        "create": true,
                                        "read": true,
                                        "update": true,
                                        "delete": true
                                    },
                                    "cliente": {
                                        "create": true,
                                        "read": true,
                                        "update": true,
                                        "delete": true
                                    },
                                    "company": {
                                        "create": true,
                                        "read": true,
                                        "update": true,
                                        "delete": true
                                    },
                                    "evaluation": {
                                      "create": true,
                                      "read": true,
                                      "update": true,
                                      "delete": true
                                    },
                                    "questionnaires": {
                                      "create": true,
                                      "read": true,
                                      "update": true,
                                      "delete": true
                                    }
                                  }
                              },
                              {
                                  "roleName": "Role comercial",
                                  "roleID": "dghfjkljhgdkhtj,447579860",
                                  "modules": {
                                      "dominio": {
                                          "create": true,
                                          "read": true,
                                          "update": true,
                                          "delete": true
                                      }
                                  }
                              }
                          ]
                      },
                  ]
              },
              {
                "client": "fb161c55-937b-47d2-be7d-195165aff77e",
                "clientName": "Xinergy",
                "accessType": "xinergy",
                "companies": [
                    {
                        "company": null,
                        "accessType": "xinergy",
                        "roles": [
                            {
                                "roleName": "Role gestion",
                                "roleID": "34563789iouygjhfjkl",
                                "modules": {
                                    "dominio": {
                                        "create": true,
                                        "read": true,
                                        "update": true,
                                        "delete": true
                                    },
                                    "sub-dominio": {
                                        "create": true,
                                        "read": true,
                                        "update": true,
                                        "delete": true
                                    },
                                    "cliente": {
                                        "create": true,
                                        "read": true,
                                        "update": true,
                                        "delete": true
                                    },
                                    "company": {
                                        "create": true,
                                        "read": true,
                                        "update": true,
                                        "delete": true
                                    }
                                }
                            },
                            {
                                "roleName": "Role comercial",
                                "roleID": "dghfjkljhgdkhtj,447579860",
                                "modules": {
                                    "dominio": {
                                        "create": true,
                                        "read": true,
                                        "update": true,
                                        "delete": true
                                    }
                                }
                            }
                        ]
                    },
                ]
            }
          ],
          "session": "e8abb370-ca1b-47d9-b514-3e55e8338924",
          "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyaWNrQHhpbmVyZ3kuY2wiLCJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsInBlcm1pc3Npb25zIjpbeyJjbGllbnQiOiJmYjE2MWM1NS05MzdiLTQ3ZDItYmU3ZC0xOTUxNjVhZmY3N2UiLCJjbGllbnROYW1lIjoiWGluZXJneSIsImNvbXBhbmllcyI6W3siY29tcGFueSI6bnVsbCwiY29tcGFueU5hbWUiOm51bGwsInJvbGVOYW1lIjoiUm9sZSBJbml0IiwiYWNjZXNzVHlwZSI6InhpbmVyZ3kiLCJjcmVhdGUiOnRydWUsInJlYWQiOnRydWUsInVwZGF0ZSI6dHJ1ZSwiZGVsZXRlIjp0cnVlfV19XSwiZXhwIjoxNzc4NzE0NzQ5fQ.QeW32tZ3le4BLiS1xqSiekxX7W215mh_93iVVMnzcGg93EFzY9Dsuz_9m75tPPYVJ0iTYrmvkeiEHGvEXT5Z-w"
      }

      sessionStorage.setItem('user', JSON.stringify(response1));
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('client', response1.permissions[0].client);
      sessionStorage.setItem('session', response.session);
      this.isAuth = true;
      return response1;
    } catch (error) {
      console.error('Error during login:', error);
      return Promise.reject(error);
    }
  }

  /**
   * Cierra la sesión del usuario.
   */
  isLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    this.isAuth = !user ? false : true;
    console.log("isLoggedIn", this.isAuth);
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
      sessionStorage.clear();
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Error during logout:', error);
      return Promise.reject(error);
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
    console.log("user", user);
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