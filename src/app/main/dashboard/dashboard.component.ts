import { Component, AfterViewChecked, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewChecked {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewChecked() {

    const s3 = document.createElement('script');
    s3.type = 'text/javascript';
    s3.src = './assets/flot/jquery.flot.js';
    this.elementRef.nativeElement.appendChild(s3);

    const s4 = document.createElement('script');
    s4.type = 'text/javascript';
    s4.src = './assets/flot/jquery.flot.time.js';
    this.elementRef.nativeElement.appendChild(s4);

    const s4a = document.createElement('script');
    s4a.type = 'text/javascript';
    s4a.src = './assets/flot/jquery.flot.pie.js';
    this.elementRef.nativeElement.appendChild(s4a);
    const s4b = document.createElement('script');
    s4b.type = 'text/javascript';
    s4b.src = './assets/flot/jquery.flot.stack.js';
    this.elementRef.nativeElement.appendChild(s4b);
    const s4c = document.createElement('script');
    s4c.type = 'text/javascript';
    s4c.src = './assets/flot/jquery.flot.resize.js';
    this.elementRef.nativeElement.appendChild(s4c);

    const s5 = document.createElement('script');
    s5.type = 'text/javascript';
    s5.src = './assets/flot/jquery.flot.orderBars.js';
    this.elementRef.nativeElement.appendChild(s5);
    
    const s6 = document.createElement('script');
    s6.type = 'text/javascript';
    s6.src = './assets/flot/jquery.flot.spline.min.js';
    this.elementRef.nativeElement.appendChild(s6);

    const s7 = document.createElement('script');
    s7.type = 'text/javascript';
    s7.src = './assets/flot/curvedLines.js';
    this.elementRef.nativeElement.appendChild(s7);

    const s8 = document.createElement('script');
    s8.type = 'text/javascript';
    s8.src = './assets/flot/jquery.sparkline.min.js';
    this.elementRef.nativeElement.appendChild(s8);
    
    const s2 = document.createElement('script');
    s2.type = 'text/javascript';
    s2.src = './assets/flot/date.js';
    this.elementRef.nativeElement.appendChild(s2);

    const s9 = document.createElement('script');
    s9.type = 'text/javascript';
    s9.src = './assets/flot/custom.min.js';
    this.elementRef.nativeElement.appendChild(s9);
  }

}
