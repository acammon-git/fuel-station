import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { LineasRoutingModule } from './lineas-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewLinePageComponent } from './pages/new-line-page/new-line-page.component';
import { EditLinePageComponent } from './pages/edit-line-page/edit-line-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListPageComponent,
    NewLinePageComponent,
    EditLinePageComponent,
    
  ],
  imports: [
    CommonModule,
    LineasRoutingModule,
    DataTablesModule,
    FormsModule, // Agrega el FormsModule si estás utilizando formularios de plantilla
    ReactiveFormsModule,
  ]
})
export class LineasModule { }
