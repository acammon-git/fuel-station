import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/shared/services/navbar.service';
import { FontsService } from '../../services/fonts.service';
import { Fonts } from 'src/app/shared/interfaces/fonts.interface';

@Component({
  templateUrl: './new-font-page.component.html',
  styleUrls: ['./new-font-page.component.css']
})
export class NewFontPageComponent {
  //inyección de servicios
  private navbarService = inject(NavbarService);
  private fb = inject(FormBuilder);
  public fontsService = inject(FontsService);
  private toastr = inject(ToastrService);
  public router = inject(Router);
  //variables del componente
  public data: any[] = [];
  
opcion: any;
  ngOnInit(): void {
    this.navbarService.title.set("Nueva fuente"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
//cogemos todas las fuentes
    this.fontsService.viewFonts().subscribe(
      (response) => {
        console.log(response);
        this.data = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  constructor() { }
  
  //creamos los campos del formulario
  public formNewFont: FormGroup = this.fb.group(
    {
      id_linea:[''],
      nombre_fuente: [''],
      parametros: [''],
      imagen: [''],
      activo: [''],
    }
  );


  //submit recoge los datos del fomulario y hace una peticion post para crear una nueva línea
  submit() {
    if (this.formNewFont.valid) {
      const formData = this.formNewFont.getRawValue();
      const activoValue = this.formNewFont.get('activo')?.value;
      if (activoValue) {
        formData.activo = 1;
      } else {
        formData.activo = 0;
      }
      console.log(formData);
      this.fontsService.createFont(formData).subscribe({
        next: (response) => {
          this.toastr.success('Línea creada correctamente', 'Éxito');
        },
        error: (createError) => {
          this.toastr.error('Error al crear la línea', 'Error');
        }
      });
    } else {
      // El formulario no es válido, muestra un mensaje de error o realiza una acción adecuada.
      this.toastr.error('Por favor, complete todos los campos del formulario.');
    }
  }
  
}






