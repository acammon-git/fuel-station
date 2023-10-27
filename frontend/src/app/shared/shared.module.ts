import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AsideComponent } from './components/aside/aside.component';
import { UserSettingsBarComponent } from './components/user-settings-bar/user-settings-bar.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    AsideComponent,
    UserSettingsBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    AsideComponent,
  ]
})
export class SharedModule { }
