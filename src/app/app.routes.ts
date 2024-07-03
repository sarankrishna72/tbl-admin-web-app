import { MainComponent } from './pages/main/main.component';
import { Routes } from '@angular/router';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    pathMatch: 'full'
  },{
    path: ':id',
    component: MainComponent,

  }
];
