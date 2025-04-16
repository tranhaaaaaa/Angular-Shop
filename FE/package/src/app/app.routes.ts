import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './core/utils/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./pages/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path:'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m)=>m.HomeModule),

      },
      {
        path:'order-history',
        loadChildren: () =>
          import('./pages/order-history/order-history.module').then((m)=>m.OrderHistoryModule),

      },
      {
        path:'list-users',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/manager-user/manager-user.module').then((m)=>m.ManagerUserModule),

      },
      {
        path:'products',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/products/products.module').then((m)=>m.ProductsModule),

      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
