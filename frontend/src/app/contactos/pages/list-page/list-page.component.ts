import { Component, OnInit, inject } from '@angular/core';
import { NavbarService } from '../../../shared/services/navbar.service';

@Component({
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{
  // inyección de dependencias
  private navbarService = inject(NavbarService);

  ngOnInit(): void {
    this.navbarService.title.set("Contactos"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
  }
}
