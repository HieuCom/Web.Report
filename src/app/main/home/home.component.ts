import { Component, AfterViewChecked, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewChecked {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewChecked() {

    const s8 = document.createElement('script');
    s8.type = 'text/javascript';
    s8.src = './assets/flot/jquery.sparkline.min.js';
    this.elementRef.nativeElement.appendChild(s8);

    const s9 = document.createElement('script');
    s9.type = 'text/javascript';
    s9.src = './assets/flot/custom.min.js';
    this.elementRef.nativeElement.appendChild(s9);
  }

}
