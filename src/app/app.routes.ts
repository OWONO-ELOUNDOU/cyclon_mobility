import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/Authentification/login/login.component';
import { authGuard } from './guards/Auth/auth.guard';

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
        canActivate: [authGuard],
        loadComponent: () => import('./Pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'users',
        canActivate: [authGuard],
        loadComponent: () => import('./Pages/users/users.component').then(c => c.UsersComponent)
    },
    {
        path: 'user/form',
        canActivate: [authGuard],
        loadComponent: () => import('./shared/compoments/user-form/user-form.component').then(c => c.UserFormComponent)
    },
    {
        path: 'drivers',
        canActivate: [authGuard],
        loadComponent: () => import('./Pages/suppliers/suppliers.component').then(c => c.SuppliersComponent)
    },
    {
        path: 'driver/form',
        canActivate: [authGuard],
        loadComponent: () => import('./shared/compoments/supplier-form/supplier-form.component').then(c => c.SupplierFormComponent)
    },
];
