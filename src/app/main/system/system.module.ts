import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserItemComponent } from './user/user-item/user-item.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleItemComponent } from './role/role-item/role-item.component';
import { FunctionListComponent } from './function/function-list/function-list.component';
import { FunctionItemComponent } from './function/function-item/function-item.component';
import { NotificationComponent } from './notification/notification.component';
import { TranslateModule } from '@ngx-translate/core';
import { FunctionPermissionComponent } from './function/function-permission/function-permission.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { FunctionComponent } from './function/function.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';
import { UploadService } from '../../core/services/upload.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { RouterModule } from '@angular/router';
import { systemRoutes } from './system.routes';



@NgModule({
  declarations: [
    UserListComponent,
    UserItemComponent,
    RoleListComponent,
    RoleItemComponent,
    FunctionListComponent,
    FunctionItemComponent,
    NotificationComponent,
    FunctionPermissionComponent,
    UserComponent,
    RoleComponent,
    FunctionComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,    
    PaginationModule,
    ModalModule,
    Daterangepicker,
    MultiselectDropdownModule,
    RouterModule,
    systemRoutes
  ],
  providers: [
    DataService, UtilityService, UploadService
  ]
})
export class SystemModule { }
