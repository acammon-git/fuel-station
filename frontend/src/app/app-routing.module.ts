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
        loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
      },
      {
        path: 'lineas',
        component: LayoutPage,
        loadChildren: () => import('./lineas/lineas.module').then( m => m.LineasModule),
        canActivate: [AuthGuard], // ! < es requerido estar autenticado
      },
      {
        path: 'fuentes',
        component: LayoutPage,
        loadChildren: () => import('./fuentes/fuentes.module').then( m => m.FuentesModule),
        canActivate: [AuthGuard], // ! < es requerido estar autenticado
      },
      {
        path: 'contactos',
        component: LayoutPage,
        loadChildren: () => import('./contactos/contactos.module').then( m => m.ContactosModule),
        canActivate: [AuthGuard], // ! < es requerido estar autenticado
      },
      {
        path: 'userSettings',
        component: LayoutPage,
        loadChildren: () => import('./user-settings/user-settings.module').then( m => m.UserSettingsModule),
        canActivate: [AuthGuard], // ! < es requerido estar autenticado
      },
      
      // página que no existe, a la pagina principal
      {
        path: '**',
        redirectTo: 'auth',
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
