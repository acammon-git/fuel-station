import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuentesRoutingModule } from './fuentes-routing.module';
import { NewFontPageComponent } from './pages/new-font-page/new-font-page.component';
import { EditFontPageComponent } from './pages/edit-font-page/edit-font-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { ListPageComponent } from './pages/list-page/list-page.component';



@NgModule({
  declarations: [
    NewFontPageComponent,
    EditFontPageComponent,
    ListPageComponent
  ],
  imports: [
    CommonModule,
    FuentesRoutingModule,
    DataTablesModule,
    FormsModule, // Agrega el FormsModule si estás utilizando formularios de plantilla
    ReactiveFormsModule,
    
  ]
})
export class FuentesModule { }
