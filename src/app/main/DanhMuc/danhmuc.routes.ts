
import { Routes, RouterModule } from '@angular/router';
import { DoiTuongComponent } from './DoiTuong/doituong.component';
const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },    
    { path: 'index', component: DoiTuongComponent }
];
export const danhmucRouter = RouterModule.forChild(routes);