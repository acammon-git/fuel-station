import { Component, inject } from '@angular/core';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  templateUrl: './new-line-page.component.html',
  styleUrls: ['./new-line-page.component.css']
})
export class NewLinePageComponent {
  private navbarService = inject(NavbarService);
  ngOnInit(): void {
    this.navbarService.title.set("Nueva línea"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
  }
}
