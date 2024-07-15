import { Routes } from '@angular/router';
import { authGuard, signInAuthGuard } from './core/guards/auth/auth.guard';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/auth/sign-in/sign-in.component').then((m) => m.SignInComponent),
    canActivate:[signInAuthGuard],
    pathMatch: 'full'
  },{
    path: ':id',
    loadComponent: () => import('./pages/main/main.component').then((m) => m.MainComponent),
    canActivate: [authGuard],
  }
];
