import { Injectable } from '@angular/core';
import { SystemConstants } from '../../core/common/system.constants';
import { LoggedInUser } from '../domain/loggedin.user';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppCookieService } from './cookie.service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthenService {

  private authHeaders = new HttpHeaders();
  constructor(private _http: HttpClient, private cookieService: AppCookieService) { }

  jsonFile = ''; // '../../assets/products.json';

  public get(uri: string) {
    const user = this.getLoggedInUser();
    let newHeader = new HttpHeaders();
    newHeader = newHeader.set('Content-Type', 'application/json');
    newHeader = newHeader.set('Authorization', 'Bearer ' + user.access_token);
    return this._http.get(environment.BASE_URL + '/auth' + uri, { headers: newHeader })
      .pipe(catchError(this.handleError));
  }
  public post(uri: string, data?: any) {
    const user = this.getLoggedInUser();
    let newHeader = new HttpHeaders();
    newHeader = newHeader.set('Content-Type', 'application/json');
    newHeader = newHeader.set('Authorization', 'Bearer ' + user.access_token);
    return this._http.post(environment.BASE_URL + '/auth' + uri, data, { headers: newHeader })
      .pipe(catchError(this.handleError));
  }
  public handleError(error: any) {
    if (error.status === 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
    } else if (error.status === 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
    } else {
      const errMsg = error.message;
      // console.log(error);
      return Observable.throw(errMsg);
    }
  }

  getDataAsPromise(): Promise<any> {
    const body = 'userName=admin' +
      '&password=123654$' +
      '&grant_type=password';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const result = this._http.post(environment.BASE_URL + '/auth/token', body, { headers: headers }).toPromise();

    console.log(result.then(response => response.toString()));
    return result;
    // return this._http.get(this.jsonFile).toPromise()
  }

  getDataAsObservable(): Observable<any> {
    return this._http.get(this.jsonFile);
  }

  login(username: string, password: string) {
    const body = 'userName=' + encodeURIComponent(username) +
      '&password=' + encodeURIComponent(password) +
      '&grant_type=password' +
      '&client_id=' + environment.APP_ID;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const promise = new Promise((resolve, reject) => {
      this._http.post(environment.BASE_URL + '/auth/token', body, { headers: headers })
        // this._http.post('http://27.72.62.141:8888/2021' + '/auth/token', body, { headers: headers })
        .subscribe((response: any) => {
          if (response.access_token) {
            const user = new LoggedInUser(response.access_token,
              response.username,
              response.fullName,
              response.email,
              response.avatar,
              response.roles,
              response.permissions,
              response.orgCurrentId
            );

            localStorage.removeItem(SystemConstants.CURRENT_USER);
            localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));

            // remoe cached
            const key = SystemConstants.CURRENT_USER + '.permissions';
            localStorage.removeItem(key);

            this.authHeaders = new HttpHeaders();
            this.authHeaders = this.authHeaders.set('Content-Type', 'application/json');
            this.authHeaders = this.authHeaders.set('Authorization', 'Bearer ' + response.access_token);

            resolve(true);
          } else {
            reject(false);
          }
        }, error => {
          reject(error);
        });
    });

    return promise;
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  isUserAuthenticated(): boolean {
    const user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user !== null) {
      return true;
    } else {
      return false;
    }
  }

  getLoggedInUser(): LoggedInUser {
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      const cachedData = localStorage.getItem(SystemConstants.CURRENT_USER);
      const userData = JSON.parse(cachedData);
      const tokenInfo = jwt_decode(userData.access_token);
      if (this.isTokenExpired(userData.access_token)) {
        user = null;
      } else {
        user = new LoggedInUser(userData.access_token,
          tokenInfo['userName'],
          tokenInfo['firstName'] + ' ' + tokenInfo['lastName'],
          tokenInfo['email'],
          tokenInfo['avatar'],
          tokenInfo['role'],
          tokenInfo['permissions'],
          tokenInfo['orgCurrentId']);
      }
    } else {
      user = null;
    }
    return user;
  }
  
  private isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  getPermissions() {
    const user = this.getLoggedInUser();
    const parms = { '@UserName': user.username, '@OrganizationId': user.orgCurrentId };

    let newHeader = new HttpHeaders();
    newHeader = newHeader.set('Content-Type', 'application/json');
    newHeader = newHeader.set('Authorization', 'Bearer ' + user.access_token);

    this.post('/accounts/GetUserRightCommands', parms)
      .subscribe((response: any) => {
        console.log(response);
      });

    const promise = new Promise((resolve, reject) => {
      this._http.post(environment.BASE_URL + '/auth/accounts/GetUserRightCommands', parms, { headers: newHeader })
        .subscribe((response: any) => {
          if (response) {
            // Save permissions
            const key = SystemConstants.CURRENT_USER + '.permissions';
            localStorage.removeItem(key);
            localStorage.setItem(key, JSON.stringify(response));

            resolve(true);
          } else {
            reject(false);
          }
        }, error => {
          reject(error);
        });
    });

    return promise;
  }

  checkAccess(functionId: string) {
    const user = this.getLoggedInUser();
    const result = false;
    let permissions: any[]; // = JSON.parse(user.permissions);
    // Get permissions
    const key = SystemConstants.CURRENT_USER + '.permissions';
    let permissionData = localStorage.getItem(key);
    if (permissionData !== null && permissionData !== '') {
      permissions = JSON.parse(permissionData);
    } else {
      permissions = null;
    }

    if (permissions === null) {
      this.getPermissions();
      permissionData = localStorage.getItem(key);
      permissions = JSON.parse(permissionData);
    }
    if (permissions === null) {
      permissions = [];
    }
    const hasPermission: number = permissions.findIndex(x => x.FunctionId === functionId && x.CanRead === true);

    // let roles: any[]; // = JSON.parse(user.roles);
    // if (user.roles !== null) {
    //   roles = JSON.parse(user.roles);
    // }

    if (user.roles === null) {
      // roles = JSON.parse(user.roles);
      user.roles = [];
    }
    if (hasPermission !== -1 || user.roles.findIndex(x => x === 'Admin') !== -1) {
      return true;
    } else {
      return false;
    }
  }
  hasPermission(functionId: string, action: string): boolean {
    const user = this.getLoggedInUser();
    let result = false;
    const permission: any[] = JSON.parse(user.permissions);
    const roles: any[] = JSON.parse(user.roles);
    let hasPermission = -1;
    switch (action) {
      case 'create':
        hasPermission = permission.findIndex(x => x.FunctionId === functionId && x.CanCreate === true);
        if (hasPermission !== -1 || roles.findIndex(x => x === 'Admin') !== -1) {
          result = true;
        }
        break;
      case 'update':
        hasPermission = permission.findIndex(x => x.FunctionId === functionId && x.CanUpdate === true);
        if (hasPermission !== -1 || roles.findIndex(x => x === 'Admin') !== -1) {
          result = true;
        }
        break;
      case 'delete':
        hasPermission = permission.findIndex(x => x.FunctionId === functionId && x.CanDelete === true);
        if (hasPermission !== -1 || roles.findIndex(x => x === 'Admin') !== -1) {
          result = true;
        }
        break;
    }
    return result;
  }
}
