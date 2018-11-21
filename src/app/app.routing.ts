import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LayoutComponent } from './_shared/ui/layout/layout.component';

import { DashboardComponent } from './dashboard/dashboard.component';


import { AuthGuard } from './_auth/guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

    { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },

    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '',  redirectTo: '/dashboard', pathMatch: 'full' }, // catch all route

];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
