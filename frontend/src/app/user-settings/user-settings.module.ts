import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { PasswordPage} from './pages/password-page/password-page.component';
import { PhotoPage } from './pages/photo-page/photo-page.component';
import { NamePage } from './pages/name-page/name-page.component';


@NgModule({
  declarations: [
    PasswordPage,
    PhotoPage,
    NamePage
  ],
  imports: [
    CommonModule,
    UserSettingsRoutingModule
  ]
})
export class UserSettingsModule { }
