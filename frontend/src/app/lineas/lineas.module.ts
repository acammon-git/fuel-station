import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { LineasRoutingModule } from './lineas-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';



@NgModule({
  declarations: [
    ListPageComponent,
    
  ],
  imports: [
    CommonModule,
    LineasRoutingModule,
    DataTablesModule
  ]
})
export class LineasModule { }
