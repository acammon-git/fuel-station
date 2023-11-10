import { Component, OnInit, computed, inject } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { User } from '../../interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'shared-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent { // Debes implementar OnInit para utilizar ngOnInit
  // inyección de servicios
  public authService = inject(AuthService);
  // datos de usuario autenticado
  public nombre = computed(() => this.authService.user()?.nombre);
  public foto = computed(() => {
    const imageName = this.authService.user()?.foto;
    return `${environment.baseUrl}/serve-images/${imageName}`;
  }); 
  
  // Rutas de nuestro menú
  public menuItems: MenuItem[] = [
    { route: '/lineas/list', name: 'Líneas', icon: 'zmdi-reader' },
    { route: '/fuentes/list', name: 'Fuentes', icon: 'zmdi-device-hub' },
    { route: '/contactos/list', name: 'Contactos', icon: 'zmdi-accounts-alt' },
  ];
  // configuraciones/opciones del menu
  public isSettingsMenuOpen: boolean = false;
  public mostrarOpcionFoto: boolean = false;

  mostrarOpcionCambiarFoto() {
    this.mostrarOpcionFoto = !this.mostrarOpcionFoto;
  }
  toggleSettingsMenu() {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }
}
