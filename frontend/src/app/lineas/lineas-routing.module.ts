import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewLinePageComponent } from './pages/new-line-page/new-line-page.component';
import { EditLinePageComponent } from './pages/edit-line-page/edit-line-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

// todas estas rutas se cargan por lazyload
// empiezan por la ruta definida en el fichero de rutas principal
// /lineas
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
    component: NewLinePageComponent,
  },
  {
    path: 'edit',
    component: EditLinePageComponent,
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
export class LineasRoutingModule {}
