import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { AuthenService } from '../../core/services/authen.service';
import { MessageContstants } from '../../core/common/message.constants';
import { UrlConstants } from '../../core/common/url.constants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rememberMe = false;
  loading = false;
  model: any = {};
  returnUrl: string;
  messages: string[] = [];
  year = new Date().getFullYear();
  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    // Retrieve rememberMe value from local storage
    const rememberValue = localStorage.getItem('rememberMe');
    if (rememberValue === 'yes') {
      this.rememberMe = true;
    } else {
      this.rememberMe = false;
    }
    this.AutoLogin();
  }

  login() {
    this.loading = true;
    localStorage.removeItem('rememberMe');
    this.authenService.login(this.model.username, this.model.password)
      .then(data => {
        // Save rememberMe value to local storage
        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'yes');
        }
        this.router.navigate([UrlConstants.HOME]);
      }).catch(error => {
        this.notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
        this.loading = false;
      });
  }

  AutoLogin() {
    // Retrieve rememberMe value from local storage
    const rememberMe = localStorage.getItem('rememberMe');
    const user = this.authenService.getLoggedInUser();
    if (user != null && rememberMe === 'yes') {
      this.router.navigate([UrlConstants.HOME]);
    } else {
      console.log('You need to login');
    }
  }

  add(message: string) {
    this.messages.push(message);
  }

  addMessages(rows: any) {
    for (let row of rows) {
      this.add(JSON.stringify(row));
    }
  }

  clear() {
    this.messages = [];
  }

  handleError() { }

}
