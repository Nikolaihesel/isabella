import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectComponent } from './pages/project/project.component';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'admin', component: Admin },
];

