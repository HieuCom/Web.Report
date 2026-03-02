import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SimpleTinyComponent } from './simple-tiny/simple-tiny.component';
import { DataService } from '../core/services/data.service';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignalrService } from '../core/services/signalr.service';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';



@NgModule({
  declarations: [
    SidebarMenuComponent,
    TopMenuComponent,
    SimpleTinyComponent,
    ConfirmPopupComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    TopMenuComponent,
    SidebarMenuComponent,
    SimpleTinyComponent
  ],
  providers:[
    DataService,
    AuthenService,
    UtilityService,
    SignalrService
  ]
})
export class SharedModule { }
