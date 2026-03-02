import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';

export const mainRoutes: Routes = [
    {
        // localhost:4200/main
        path: '', component: MainComponent, children: [
            // { path: '', redirectTo: '', pathMatch: 'full' },
            // { path: '', component: HomeComponent },
            // { path: '', loadChildren: './task-manager/task-manager.module#TaskManagerModule' },

            { path: '', component: HomeComponent },

            { path: 'dashboard', component: DashboardComponent },

            { path: 'system', loadChildren: './system/system.module#SystemModule' },

            { path: 'task', loadChildren: './task-manager/task-manager.module#TaskManagerModule' },

            { path: 'product-category', loadChildren: './product-category/product-category.module#ProductCategoryModule' },

            { path: 'product', loadChildren: './product/product.module#ProductModule' },

            { path: 'order', loadChildren: './order/order.module#OrderModule' },

            { path: 'report', loadChildren: './report/report.module#ReportModule' },

            { path: 'inventory', loadChildren: './Inventory/Inventory.module#inventoryModule' },

        ]
    }

];
