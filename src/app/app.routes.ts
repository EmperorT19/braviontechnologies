import { Routes } from '@angular/router';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';

export const routes: Routes = [
  { path: '', component: MaintenanceComponent },
  { path: '**', redirectTo: '' }
];
