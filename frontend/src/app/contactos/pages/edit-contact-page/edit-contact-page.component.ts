import { Component, inject } from '@angular/core';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  templateUrl: './edit-contact-page.component.html',
  styleUrls: ['./edit-contact-page.component.css']
})
export class EditContactPageComponent {
  private navbarService = inject(NavbarService);
  ngOnInit(): void {
    this.navbarService.title.set("Editar contacto"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
  }
}
