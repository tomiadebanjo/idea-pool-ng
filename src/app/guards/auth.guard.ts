import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {
  isAuth: boolean;
  isAuthSubscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    this.isAuthSubscription = this.authService.isAuth.subscribe(val => {
      this.isAuth = val;
    });
    if (this.isAuth) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }
}
