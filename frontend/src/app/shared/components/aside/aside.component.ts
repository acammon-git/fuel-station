import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'shared-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit { // Debes implementar OnInit para utilizar ngOnInit
  // Rutas de nuestro menú
  isSettingsMenuOpen: boolean = false;
  public nombre?:string;
  public foto?:string;
  public menuItems: MenuItem[] = [
    { route: '/lineas/list', name: 'Líneas', icon: 'zmdi-reader' },
    { route: '/fuentes/list', name: 'Fuentes', icon: 'zmdi-device-hub' },
    { route: '/contactos/list', name: 'Contactos', icon: 'zmdi-accounts-alt' },
    { route: '/userSettings', name: 'Datos Cuenta', icon: 'zmdi-settings' },
  ];
  public userData?: User;

  ngOnInit(): void {
    // Carga los datos desde el Local Storage al iniciar el componente
    const storedData = localStorage.getItem('user'); // Obtén los datos del Local Storage
  
    if (storedData) {
      // Si se encontraron datos en el Local Storage, conviértelos de JSON a un objeto
      this.userData = JSON.parse(storedData);
  
      if (this.userData) {
        // Verifica que `this.userData` no sea nulo
        this.nombre = this.userData.nombre;
        const imageName = 'alberto.jpg';
        this.foto = `http://localhost:3000/serve-images/${imageName}`;
        console.log(this.userData);
      } else {
        console.log('Los datos del usuario son nulos');
      }
    } else {
      console.log('No se encontraron datos en el Local Storage');
    }
  }
  toggleSettingsMenu() {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }
}
