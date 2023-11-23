import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'playground',
    loadComponent: () => import('./components/playground/playground.component').then(m => m.PlaygroundComponent)
  },
  {
    path: 'students',
    loadComponent: () => import('./components/students/students.component').then(m => m.StudentsComponent)
  },
  {
    path: 'students/:studentId',
    loadComponent: () => import('./components/students/student-details/student-details.component').then(m => m.StudentDetailsComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./components/orders/orders-list/orders-list.component').then(m => m.OrdersListComponent)
  }
];
