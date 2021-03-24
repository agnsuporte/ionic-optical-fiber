import { Injectable } from '@angular/core';

import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.auth.isLoggedIn();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const logged: boolean = this.auth.isLoggedIn();

    if (logged === false) {
      this.router.navigate(['/login']);
      return false;
    } else {
      this.auth.isTokenValid().subscribe((data) => {
        if (data.isToken === false || data.isToken === undefined) {
          this.router.navigate(['/login']);
        }
      });
    }

    return true;
  }
}
