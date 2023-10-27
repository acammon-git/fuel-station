import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'user-settings-bar',
  templateUrl: './user-settings-bar.component.html',
  styles: [
  ]
})
export class UserSettingsBarComponent {
  isSettingsMenuOpen: boolean = false;
  public menuItems: MenuItem[] = [
    { route: '/userSettings/password', name: 'Contraseña', icon: 'zmdi-reader' },
    { route: '/userSettings/name', name: 'Nombre', icon: 'zmdi-device-hub' },
    { route: '/userSettings/photo', name: 'Foto', icon: 'zmdi-accounts-alt' },
  ];
  toggleSettingsMenu() {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }
}
