// app.routes.ts
import { Routes } from '@angular/router';
import { SensorQuery } from './sensor-query/sensor-query';
import { AlaQuery } from './ala-query/ala-query';

export const routes: Routes = [
  { path: 'lab-results', component: SensorQuery },
  { path: 'ala-files', component: AlaQuery },
  { path: '', redirectTo: 'lab-results', pathMatch: 'full' }
];