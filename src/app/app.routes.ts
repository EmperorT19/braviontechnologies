import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ServicesComponent } from './components/services/services.component';
import { CctvComponent } from './components/cctv/cctv.component';
import { ProcurementComponent } from './components/procurement/procurement.component';
import { QuoteComponent } from './components/quote/quote.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'cctv', component: CctvComponent },
  { path: 'procurement', component: ProcurementComponent },
  { path: 'quote', component: QuoteComponent },
  { path: '**', redirectTo: '' }
];
