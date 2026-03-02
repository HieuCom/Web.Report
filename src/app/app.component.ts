import { Component, AfterViewChecked, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggedInUser } from './core/domain/loggedin.user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  public user: LoggedInUser;
  constructor(private elementRef: ElementRef,
    private translate: TranslateService) {
    this.translate.setDefaultLang('vi');

  }
  ngAfterViewChecked() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = './assets/js/custom.js';
    this.elementRef.nativeElement.appendChild(s);
  }

}
