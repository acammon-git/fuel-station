import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewFontPageComponent } from './pages/new-font-page/new-font-page.component';
import { EditFontPageComponent } from './pages/edit-font-page/edit-font-page.component';

// todas estas rutas se cargan por lazyload
// empiezan por la ruta definida en el fichero de rutas principal
// /fuentes
const routes: Routes = [
  // listado de formaciones del usuario
  {
    path: '',
    component: LayoutPageComponent, // Página principal
  },
  {
    path: 'list',
    component: ListPageComponent,
  },
  {
    path: 'new',
    component: NewFontPageComponent,
  },
  {
    path: 'edit',
    component: EditFontPageComponent,
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
export class FuentesRoutingModule { }
