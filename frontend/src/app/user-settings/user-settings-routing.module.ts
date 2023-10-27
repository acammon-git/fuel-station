import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordPage } from './pages/password-page/password-page.component';
import { NamePage } from './pages/name-page/name-page.component';
import { PhotoPage } from './pages/photo-page/photo-page.component';
import { SettingsPage } from './layout/layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    data: {bodyClass:'simple-page'}, // en modulo auth van a tener su propio layout
    children: [
      // iniciar sesión
      {
        path:'password',
        component: PasswordPage,
      },
      {
        path:'name',
        component: NamePage,
      },
      {
        path:'photo',
        component: PhotoPage,
      },
      // pagina por defecto, login
      {
        path:'**',
        redirectTo: '',
        data: {bodyClass:'simple-page'}

      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserSettingsRoutingModule { }
