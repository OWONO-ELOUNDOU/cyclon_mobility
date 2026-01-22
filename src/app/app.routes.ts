import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/Authentification/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./Pages/Authentification/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./Pages/Authentification/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./Pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'users',
        loadComponent: () => import('./Pages/users/users.component').then(c => c.UsersComponent)
    },
    {
        path: 'drivers',
        loadComponent: () => import('./Pages/suppliers/suppliers.component').then(c => c.SuppliersComponent)
    },
];
