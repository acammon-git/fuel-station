import { Component } from '@angular/core';
import { MenuItem } from '../../shared/interfaces/menu-item.interface';

@Component({
  selector: 'menu-settings',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class SettingsPage {
  public userItems: MenuItem[] = [
    { route: '/userSettings/password', name: 'Contraseña', icon: 'zmdi-reader' },
    { route: '/userSettings/name', name: 'Nombre', icon: 'zmdi-device-hub' },
    { route: '/userSettings/photo', name: 'Foto', icon: 'zmdi-accounts-alt' },
  ];
}
