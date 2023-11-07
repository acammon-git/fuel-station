import { Component, OnInit, inject } from '@angular/core';
import { NavbarService } from 'src/app/shared/services/navbar.service';


@Component({
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent{
  private navbarService = inject(NavbarService);
  ngOnInit(): void {
    this.navbarService.title.set("Todas las lineas"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
  }
}
