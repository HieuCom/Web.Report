import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenService } from '../core/services/authen.service';
import { LoginComponent } from './login/login.component';
import { NotificationService } from '../core/services/notification.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { pagesRouter } from './pages.routes';
import { AppCookieService } from '../core/services/cookie.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
    pagesRouter

  ],
  providers:[
    AuthenService,
    NotificationService,
    AppCookieService
  ]
})
export class PagesModule { }
