import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Component({
  selector: 'shared-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent { // Debes implementar OnInit para utilizar ngOnInit
  // inyección de servicios
  public authService = inject(AuthService);
  private cdr= inject(ChangeDetectorRef);
  // datos de usuario autenticado
  public nombre = computed(() => this.authService.user()?.nombre);
  public id = computed(() => this.authService.user()?.id_usuario);
  
  public foto = computed(() => {
    const imageName = this.authService.user()?.foto;
    return `${environment.baseUrl}/serve-images/${imageName}`;
  }); 
  
  //constructor
  constructor(){}
  // Rutas de nuestro menú
  public menuItems: MenuItem[] = [
    { route: '/lineas/list', name: 'Líneas', icon: 'zmdi-reader' },
    { route: '/fuentes/list', name: 'Fuentes', icon: 'zmdi-device-hub' },
    { route: '/contactos/list', name: 'Contactos', icon: 'zmdi-accounts-alt' },
  ];
  // configuraciones/opciones del menu
  public isSettingsMenuOpen: boolean = false;
  public mostrarOpcionFoto: boolean = false;

  mostrarOpcionCambiarFoto() {
    this.mostrarOpcionFoto = !this.mostrarOpcionFoto;
  }
  toggleSettingsMenu() {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }
  notificarCambio(): void {
    this.cdr.detectChanges();
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    console.log(this.id());
    if (file) {
      const formData: FormData = new FormData();
      formData.append('foto', file);

      this.authService.uploadPhoto(this.id(), formData).subscribe(
        (data) => {
          console.log(data.message); // Puedes manejar la respuesta del servidor aquí
        },
        (error) => {
          console.error('Error al enviar la foto al servidor:', error);
        }
      );
    }
    this.notificarCambio();
    
  }
}
