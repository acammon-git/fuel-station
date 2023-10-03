import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPage } from './pages/login/login-page.component';
import { NoSesionLayoutPage } from './pages/layout/layout-page.component';
import { EditPageComponent } from './pages/edit/edit-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginPage,
    NoSesionLayoutPage,
    EditPageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
