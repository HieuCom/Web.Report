import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
export const appRoutes: Routes = [
    //localhost:4200
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    //localhost:4200/login
    { path: '', loadChildren: './pages/pages.module#PagesModule' },
    { path: 'main', loadChildren: './main/main.module#MainModule',canActivate:[AuthGuard] },
]