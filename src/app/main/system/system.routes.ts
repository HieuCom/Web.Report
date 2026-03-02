import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { FunctionListComponent } from './function/function-list/function-list.component';
import { FunctionComponent } from './function/function.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    { path: 'user', component: UserComponent },
    { path: 'function', component: FunctionComponent },
    { path: 'role', component: RoleListComponent },
    // { path: 'notification', component: NotificationComponent },
]
export const systemRoutes = RouterModule.forChild(routes)