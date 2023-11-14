import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewContactPageComponent } from './pages/new-contact-page/new-contact-page.component';
import { EditContactPageComponent } from './pages/edit-contact-page/edit-contact-page.component';


// todas estas rutas se cargan por lazyload
// empiezan por la ruta definida en el fichero de rutas principal
// /contactos
const routes: Routes = [
  // listado de formaciones del usuario
  {
    path: '',
    component: ListPageComponent, // Página principal
  },
  {
    path: 'list',
    component: ListPageComponent,
  },
  {
    path: 'new',
    component: NewContactPageComponent,
  },
  {
    path: 'edit',
    component: EditContactPageComponent,
  },
  // página que no existe, a la pagina principal
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosRoutingModule { }
