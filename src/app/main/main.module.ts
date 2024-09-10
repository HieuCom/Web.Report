import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { RouterModule, Routes } from '@angular/router';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { SignalrService } from '../core/services/signalr.service';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../core/services/data.service';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(mainRoutes),
    SharedModule
  ],
  declarations:
    [
      MainComponent,
      HomeComponent,
      DashboardComponent
    ],
  providers: [UtilityService, AuthenService, SignalrService, DataService],
  exports:[
  ]
})
export class MainModule { }
