import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';

// todas estas rutas se cargan por lazyload
// empiezan por la ruta definida en el fichero de rutas principal
// /lineas
const routes: Routes = [
  // listado de formaciones del usuario
  {
    path: 'list',
    component: ListPageComponent, // todas estas rutas van a tener el layout principal
  },
   // página que no existe, a la pagina principal
   {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineasRoutingModule { }
