import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const { value } = form;
    this.loading = true;

    this.authService.login(value).subscribe(
      result => this.authenticateUser(result),
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  authenticateUser({ jwt, refresh_token }) {
    this.authService.jwt = jwt;
    this.authService.refreshToken = refresh_token;
    this.authService.isAuth.next(true);
    this.loading = false;
    this.router.navigate(['/']);

    localStorage.setItem('jwt', jwt);
    localStorage.setItem('refreshToken', refresh_token);
  }
}
