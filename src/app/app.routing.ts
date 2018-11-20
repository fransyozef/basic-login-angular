import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './_auth/login/login.component';
import { LayoutComponent } from './_shared/ui/layout/layout.component';
import { AuthGuard } from './_auth/guards/auth.guard';

const routes: Routes = [
    { path: '' , component: LayoutComponent , children : [
        { path: 'dashboard', component: DashboardComponent },
    ], canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },


    { path: '',  redirectTo: '/dashboard', pathMatch: 'full' }, // catch all route

];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
