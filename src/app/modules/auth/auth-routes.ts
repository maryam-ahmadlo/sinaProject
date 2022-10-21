import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    path: '',
    loadComponent: () => import('./pages').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages').then((m) => m.LoginFormComponent),
      },
     
    ],
  },
];
