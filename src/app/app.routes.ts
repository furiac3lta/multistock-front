import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [

{
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/dashboard/dasboard')
            .then(m => m.Dashboard)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./modules/products/product-list')
            .then(m => m.ProductList)
      },
      {
  path: 'categories',
  loadComponent: () =>
    import('./modules/categories/category-list')
    .then(m => m.CategoryList)
},
{
  path: 'movements',
  loadComponent: () => import('./modules/movements/movement-list')
    .then(m => m.MovementList)
},
{
  path: 'movements/in',
  loadComponent: () => import('./modules/movements/movement-in')
    .then(m => m.MovementIn)
},
{
  path: 'movements/out',
  loadComponent: () => import('./modules/movements/movement-out')
    .then(m => m.MovementOut)
},
{
  path: 'movements/history',
  loadComponent: () =>
    import('./modules/movements/movement-history')
      .then(m => m.MovementHistory),
},
{
  path: 'transfers/history',
  loadComponent: () =>
    import('./modules/transfers/transfer-history')
      .then(m => m.TransferHistoryComponent)
},






    ]
  }
];
