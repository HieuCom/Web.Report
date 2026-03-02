import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstants } from './../common/system.constants';
import { AuthenService } from './authen.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { MessageContstants } from './../common/message.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService {
  private headers = new HttpHeaders();

  constructor(private _http: HttpClient,
    private _authenService: AuthenService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Authorization', 'Bearer ' + _authenService.getLoggedInUser().access_token);
  }

  postCanDoiKeToan(uri: string, data?: any) {

    return this._http.post(environment.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // err hoatdong-list.component.ts:43 apps.cnsvietnam.com.vn/demo/api/KQHDSXKD 415 (Unsupported Media Type)
  getHDSXKD(uri: string, data?: any) {

    return this._http.get(environment.BASE_API + uri, data)
      .pipe(catchError(this.handleError));
  }

  post2CanDoiKeToan(uri: string, data: { TU_NGAY: Date, DEN_NGAY: Date }) {
    return this._http.post(environment.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  
  getCanDoiKeToan(uri: string) {

    return this._http.get(environment.BASE_API + uri, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getKho(uri: string) {

    return this._http.get(environment.BASE_API + uri, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  get(uri: string) {

    return this._http.get(environment.BASE_API + uri, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  post(uri: string, data?: any) {

    return this._http.post(environment.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  submit(uri: string, data?: any) {

    return this._http.post(environment.BASE_URL + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  put(uri: string, data?: any) {

    return this._http.put(environment.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  delete(uri: string) {

    return this._http.delete(environment.BASE_API + uri, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  deleteWithMultiParams(uri: string, params: any) {
    let paramStr = '';

    params.array.forEach(param => {
      paramStr += param + '=' + params[param] + '&';
    });

    return this._http.delete(environment.BASE_API + uri + '/?' + paramStr, { headers: this.headers })
      .pipe(catchError(this.handleError));

  }
  postFile(uri: string, data?: any) {
    let newHeader = new HttpHeaders();
    newHeader = newHeader.set('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.post(environment.BASE_API + uri, data, { headers: newHeader })
      .pipe(catchError(this.handleError));
  }
  getRootFile(uri: string, data?: any) {
    let newHeader = new HttpHeaders();
    newHeader = newHeader.set('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.get(environment.BASE_API + uri, { headers: newHeader })
      .pipe(catchError(this.handleError));
  }
  deleteFile(uri: string, data?: any) {
    let newHeader = new HttpHeaders();
    newHeader = newHeader.set('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.delete(environment.BASE_API + uri, { headers: newHeader })
      .pipe(catchError(this.handleError));
  }
  public handleError(error: any) {
    if (error.status === 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    } else if (error.status === 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.FORBIDDEN);
      this._utilityService.navigateToLogin();
    } else {
      const errMsg = error.message;
      // console.log(error);
      this._notificationService.printErrorMessage(MessageContstants.FUNCTION_ERROR_MSG);

      return Observable.throw(errMsg);
    }


  }
}
