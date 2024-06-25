import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Router } from '@angular/router';
import { config } from 'src/assets/configuration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _url: string = ''

  constructor(private _http: HttpClient, private _router: Router) {
  }

  login(data:JSON) {
    this._url = config.baseURL + 'auth/login';
    return this._http.post<any>(this._url, data)
  }

  loggedIn() {
    return (!!sessionStorage.getItem('token'))
  }

  getToken() {
    return sessionStorage.getItem('token')
  }

  logout() {
    sessionStorage.removeItem('token');

    this._router.navigate([''])
  }
}
