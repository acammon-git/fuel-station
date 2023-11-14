import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactosRoutingModule } from './contactos-routing.module';
import { NewContactPageComponent } from './pages/new-contact-page/new-contact-page.component';
import { EditContactPageComponent } from './pages/edit-contact-page/edit-contact-page.component';


@NgModule({
  declarations: [
    NewContactPageComponent,
    EditContactPageComponent, 
  ],
  imports: [
    CommonModule,
    ContactosRoutingModule
  ]
})
export class ContactosModule { }
