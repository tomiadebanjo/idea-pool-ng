import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = new BehaviorSubject<boolean>(false);
  jwt: string;
  refreshToken: string;
  userInfo: any;

  constructor(private http: HttpClient) {}

  login(form: { email: string; password: string }): Observable<any> {
    return this.http.post(
      'https://small-project-api.herokuapp.com/access-tokens',
      form
    );
  }

  signUp(form: User): Observable<any> {
    return this.http.post(
      'https://small-project-api.herokuapp.com/users',
      form
    );
  }

  fetchUserInfo(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Access-Token': this.jwt
      })
    };

    return this.http.get(
      'https://small-project-api.herokuapp.com/me',
      httpOptions
    );
  }
}
