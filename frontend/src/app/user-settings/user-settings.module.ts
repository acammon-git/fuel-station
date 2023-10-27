import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { PasswordPage} from './pages/password-page/password-page.component';
import { PhotoPage } from './pages/photo-page/photo-page.component';
import { NamePage } from './pages/name-page/name-page.component';
import { RouterModule } from '@angular/router';
import { UserSettingsBarComponent } from './components/user-settings-bar/user-settings-bar.component';


@NgModule({
  declarations: [
    PasswordPage,
    PhotoPage,
    NamePage,
    UserSettingsBarComponent,
  ],
  imports: [
    CommonModule,
    UserSettingsRoutingModule,
    RouterModule,
  ],
  exports: [
    UserSettingsBarComponent
  ]
})
export class UserSettingsModule { }
