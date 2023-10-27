import { Component, OnInit, inject } from '@angular/core';
import { NavbarService } from 'src/app/shared/services/navbar.service';
import { environment } from 'src/environments/environment.development';

@Component({
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit{
  // inyección de dependencias
  private navbarService = inject(NavbarService);
  

  ngOnInit(): void {
    this.navbarService.title.set("Editar mi cuenta"); // el título será "Editar mi cuenta"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
  }
}
