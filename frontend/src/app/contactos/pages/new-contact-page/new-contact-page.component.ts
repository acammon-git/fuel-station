import { Component, inject } from '@angular/core';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  templateUrl: './new-contact-page.component.html',
  styleUrls: ['./new-contact-page.component.css']
})
export class NewContactPageComponent {
  private navbarService = inject(NavbarService);
  ngOnInit(): void {
    this.navbarService.title.set("Nuevo contacto"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
  }
}
