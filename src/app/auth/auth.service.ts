import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Profile } from '../profile/profile';
import { Auth } from './auth.component';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService implements CanActivate {
  
  private authAPI = 'http://localhost:9292/auth/v1/openid';

  constructor(private router: Router, private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token')) {
        return true;
    }
  
    console.info('auth required');
    this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  login(auth: Auth) {
      return this.http.post<Auth>(this.authAPI, auth, httpOptions)
            .map(user => {
              if (user && user.token) {
                  localStorage.setItem('token', JSON.stringify(user.token));
              }

              return user;
            });
  }

  logout() {
      localStorage.removeItem('token');
  }

}
