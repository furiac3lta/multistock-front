import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [

  // 🔐 LOGIN
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login.component')
        .then(m => m.LoginComponent)
  },

  // 📌 LAYOUT + MÓDULOS INTERNOS
  {
    path: '',
    component: Layout,
    children: [

      // DASHBOARD
      {
        path: '',
        loadComponent: () =>
          import('./modules/dashboard/dasboard')
            .then(m => m.Dashboard)
      },

      // PRODUCTOS
      {
        path: 'products',
        loadComponent: () =>
          import('./modules/products/product-list')
            .then(m => m.ProductList)
      },

      // CATEGORÍAS
      {
        path: 'categories',
        loadComponent: () =>
          import('./modules/categories/category-list')
            .then(m => m.CategoryList)
      },
      {
        path: 'logs',
        loadComponent: () =>
          import('./modules/logs/log-list')
            .then(m => m.LogList)
      },


      // MOVIMIENTOS
      {
        path: 'movements',
        loadComponent: () =>
          import('./modules/movements/movement-list')
            .then(m => m.MovementList)
      },

      {
        path: 'movements/in',
        loadComponent: () =>
          import('./modules/movements/movement-in')
            .then(m => m.MovementIn)
      },

      {
        path: 'movements/out',
        loadComponent: () =>
          import('./modules/movements/movement-out')
            .then(m => m.MovementOut)
      },

      {
        path: 'movements/history',
        loadComponent: () =>
          import('./modules/movements/movement-history')
            .then(m => m.MovementHistory)
      },

      // TRANSFERENCIAS
      {
        path: 'transfers/history',
        loadComponent: () =>
          import('./modules/transfers/transfer-history')
            .then(m => m.TransferHistoryComponent)
      },

      // USUARIOS
      {
        path: 'users',
        loadComponent: () =>
          import('./modules/users/user-list')
            .then(m => m.UserList)
      },



    ]
  }
];
