import { Component, inject } from '@angular/core';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  templateUrl: './edit-line-page.component.html',
  styleUrls: ['./edit-line-page.component.css']
})
export class EditLinePageComponent {
  private navbarService = inject(NavbarService);
  ngOnInit(): void {
    this.navbarService.title.set("Editar línea"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
  }
}
