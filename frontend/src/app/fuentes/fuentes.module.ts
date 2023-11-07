import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuentesRoutingModule } from './fuentes-routing.module';
import { NewFontPageComponent } from './pages/new-font-page/new-font-page.component';
import { EditFontPageComponent } from './pages/edit-font-page/edit-font-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';


@NgModule({
  declarations: [
    NewFontPageComponent,
    EditFontPageComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    FuentesRoutingModule
  ]
})
export class FuentesModule { }
