import { Component, inject } from '@angular/core';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  templateUrl: './new-font-page.component.html',
  styleUrls: ['./new-font-page.component.css']
})
export class NewFontPageComponent {
  private navbarService = inject(NavbarService);
  ngOnInit(): void {
    this.navbarService.title.set("Nueva fuente"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
  }
}
