import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './_auth/guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ItemsComponent } from './items/items.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';

const routes: Routes = [

    { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
    { path: 'items', component: ItemsComponent , canActivate: [AuthGuard] },
    { path: 'item-edit/:id', component: ItemEditComponent , canActivate: [AuthGuard] },

    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '',  redirectTo: '/dashboard', pathMatch: 'full' }, // catch all route

];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
