import { Component, computed, effect, inject } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // inyección de dependencias
  private navbarService = inject(NavbarService);
  // definición de variables
  public title = ""; // por defecto el titulo está vacío
  public backUrl = ""; // por defecto no hay url para volver atrás

  constructor(){
    // escuchamos los cambios del titulo en el servicio
    effect(() => this.title = this.navbarService.title());
    // escuchamos los cambios de la url anterior en el servicio
    effect(() => this.backUrl = this.navbarService.backUrl());
  }
}
