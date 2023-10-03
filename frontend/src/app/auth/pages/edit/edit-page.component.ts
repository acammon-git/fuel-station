import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent {
  // Declaración de variables
  isPasswordChangeChecked: boolean = false;
  // Propiedad que contiene la variable de entorno
  public environment = environment;

  // Controlo el cambio del checkbox para cambiar la contraseña
  togglePasswordChange(event: any) {
    this.isPasswordChangeChecked = event.target.checked;
  }
}
