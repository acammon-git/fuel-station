import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page.component';
import { NoSesionLayoutPage } from './pages/layout/layout-page.component';
import { LayoutPage } from '../shared/pages/layout/layout-page.component';
import { AuthGuard } from './guards/auth.guard';
import { EditPageComponent } from './pages/edit/edit-page.component';

// todas estas rutas se cargan por lazyload
// empiezan por la ruta definida en el fichero de rutas principal
// auth/xxxx
const routes: Routes = [
  {
    path: 'login',
    component: NoSesionLayoutPage, // en modulo auth van a tener su propio layout
    children: [
      // iniciar sesión
      {
        path:'',
        component: LoginPage,
      },
      // pagina por defecto, login
      {
        path:'**',
        redirectTo: ''
      },
    ]
  },
  // pagina editar va a usar el layout full y requiere login
  {
    path:'edit',
    component: LayoutPage,
    children: [
      { path: '', component: EditPageComponent }
    ],
    canActivate: [AuthGuard] // ! < es requerido estar autenticado
  },
  // pagina por defecto, login
  {
    path:'**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
