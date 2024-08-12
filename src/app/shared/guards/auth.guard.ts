import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    console.log("AUTH GUARD", this.authService.isLoggedIn());
    return this.authService.isLoggedIn() // || this.router.navigate(["login"]);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.authService.isActive().pipe(
      map((isActive: boolean) => {
        if (isActive) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['login']);
        return of(false);
      })
    );
  }
}
