import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LayoutPage } from './shared/pages/layout/layout-page.component';

const routes: Routes = [
  // ruta de inicio
  {
    path: '',
    children: [
      // rutas de la aplicación
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
      },
      {
        path: 'lineas',
        component: LayoutPage,
        loadChildren: () => import('./lineas/lineas.module').then( m => m.LineasModule),
        canActivate: [AuthGuard] // ! < es requerido estar autenticado
      },
      // página que no existe, a la pagina principal
      {
        path: '**',
        redirectTo: 'lineas',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
