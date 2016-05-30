import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class Auth{
  private currentUser : User;

  constructor(private _http: Http){}

  isAuthenticated(){
    return localStorage.getItem('auth_token');
  }

  login(credentials:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this._http
      .post('/auth/authenticate', JSON.stringify(credentials),{headers})
      .subscribe(
        response => {
          let data = response.json();
          localStorage.setItem('auth_token',JSON.stringify(data));
          this.currentUser = JSON.parse(localStorage.getItem('auth_token')).user;
        }
      )
  }

  logout(){
    localStorage.removeItem('auth_token');
    this.currentUser = null;
  }

  register(formData:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    localStorage.removeItem('auth_token');
    this._http
      .post('/auth/register',JSON.stringify(formData),{headers})
      .subscribe(
        response => {
          let data = response.json();
          localStorage.setItem('auth_token',JSON.stringify(data));
        }
      )
  }




}
