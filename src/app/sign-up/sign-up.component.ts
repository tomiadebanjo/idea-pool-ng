import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email: string;
  password: string;
  name: string;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const { value } = form;
    this.loading = true;

    this.authService.signUp(value).subscribe(
      result => this.authenticateUser(result),
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  authenticateUser({ jwt, refresh_token }) {
    console.log({ jwt, refresh_token });
    this.authService.jwt = jwt;
    this.authService.refreshToken = refresh_token;
    this.authService.isAuth.next(true);
    this.loading = false;
    this.router.navigate(['/']);

    localStorage.setItem('jwt', jwt);
    localStorage.setItem('refreshToken', refresh_token);
  }
}
