import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Items } from './items/items';
import { Suppliers } from './suppliers/suppliers';
import { Products } from './products/products';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'items', component: Items },
      { path: 'suppliers', component: Suppliers },
      { path: 'products', component: Products },
      { path: '', redirectTo: 'items', pathMatch: 'full' }
    ]
  }
];
