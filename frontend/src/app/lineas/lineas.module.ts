import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { LineasRoutingModule } from './lineas-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewLinePageComponent } from './pages/new-line-page/new-line-page.component';
import { EditLinePageComponent } from './pages/edit-line-page/edit-line-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';




@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewLinePageComponent,
    EditLinePageComponent,
    
  ],
  imports: [
    CommonModule,
    LineasRoutingModule,
    DataTablesModule
  ]
})
export class LineasModule { }
