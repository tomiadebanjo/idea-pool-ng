import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  userInfo: User;
  isAuth: boolean;
  isAuthSubscription: Subscription;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthSubscription = this.authService.isAuth.subscribe(val => {
      this.isAuth = val;
      if (this.isAuth === true) {
        this.getCurrentUser();
      }
    });
  }

  ngOnInit() {}

  getCurrentUser() {
    this.loading = true;
    this.authService.fetchUserInfo().subscribe(
      result => {
        this.loading = false;
        this.userInfo = result;
        console.log(result);
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  logOut() {
    this.authService.isAuth.next(false);
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }
}
