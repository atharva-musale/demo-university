import { Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/auth/authentication.guard';
import { FormValidityGuard } from './guards/form-validity/form-validity.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home').then(m => m.Home) },
  { path: 'admin', loadComponent: () => import('./components/admin/admin').then(m => m.Admin), canActivate: [AuthenticationGuard] },
  {
    path: 'add-student',
    loadComponent: () => import('./components/add-student/add-student').then(m => m.AddStudent),
    canDeactivate: [FormValidityGuard]
  },
  {
    path: 'add-teacher',
    loadComponent: () => import('./components/add-teacher/add-teacher').then(m => m.AddTeacher),
    canDeactivate: [FormValidityGuard]
  }
];
