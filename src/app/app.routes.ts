import { Routes } from '@angular/router';
import { cashierAuthGuard, adminAuthGuard, signInAuthGuard } from './core/guards/auth/auth.guard';
export const routes: Routes = [
  {
    path: 'admin/login',
    loadComponent: () => import('./pages/auth/admins/admin-sign-in/admin-sign-in.component').then((m) => m.AdminSignInComponent),
    canActivate:[signInAuthGuard],
    pathMatch: 'full'
  },{
    path: 'cashier/login',
    loadComponent: () => import('./pages/auth/cashiers/cashier-sign-in/cashier-sign-in.component').then((m) => m.CashierSignInComponent),
    canActivate:[signInAuthGuard],
    pathMatch: 'full'
  },{
    path: "admin",
    children: [
      {
        path: ':type/details/:id',
        loadComponent: () => import('./pages/admin/main/components/view-details/view-details.component').then((m) => m.ViewDetailsComponent),
      },
      {
        path: ':type',
        loadComponent: () => import('./pages/admin/main/main.component').then((m) => m.MainComponent),
      },
    ],
    canActivate: [adminAuthGuard],
  }, {
    path: "cashier",
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/cashier/cashier-home/cashier-home.component').then((m) => m.CashierHomeComponent),
      },
      {
        path: '',
        redirectTo: "home",
        pathMatch: 'full'
      }
    ],
    canActivate: [cashierAuthGuard],
  }, {
    path: '',
    redirectTo: "admin/login",
    pathMatch: 'full'
  }
];
