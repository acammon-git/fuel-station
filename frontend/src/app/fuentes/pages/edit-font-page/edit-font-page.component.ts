import { Component, inject } from '@angular/core';
import { NavbarService } from 'src/app/shared/services/navbar.service';
import { FontsService } from '../../services/fonts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { Fonts } from 'src/app/shared/interfaces/fonts.interface';

@Component({
  templateUrl: './edit-font-page.component.html',
  styleUrls: ['./edit-font-page.component.css']
})
export class EditFontPageComponent {
  //inyección de servicios
  private navbarService = inject(NavbarService);
  public fontService = inject(FontsService);
  public fb = inject(FormBuilder);
  public router = inject(Router);
  public validatorsService = inject(ValidatorsService);
  public toastr = inject(ToastrService);

  //declaración de variables
  public data: any[] = [];
  public dtOptions: DataTables.Settings = {};
  public fuenteSeleccionada: any;
  //creamos los campos del formulario
  public formNewFont: FormGroup = this.fb.group(
    {

      nombre_fuente: [''],
      parametros: [''],
      imagen: [''],
      activo: [''],
    }
  );
  ngOnInit(): void {
    this.navbarService.title.set("Editar fuente"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
    //suscribimos para que se cargen todas las líneas
    this.fontService.viewFonts().subscribe(
      (response) => {
        console.log(response);
        this.data = response;
      },
      (error) => {
        console.error(error);
      }
    );
    this.cargarDatosFuenteSeleccionada(history.state.fuente);
  }
  constructor() { }
  cargarDatosFuenteSeleccionada(fuente: Fonts) {
    this.fontService.setCargarDatosFuenteSeleccionada(fuente);
    this.fuenteSeleccionada = this.fontService.getCargarDatosFuenteSeleccionada();
    this.formNewFont.patchValue(this.fuenteSeleccionada);

  }



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
      console.log(formData, 'objeto:', this.fuenteSeleccionada);
      this.fontService.updateFont(formData, this.fuenteSeleccionada.id_linea).subscribe({
        next: (response) => {
          if (response) {
            this.toastr.success('Línea creada correctamente', 'Éxito');
          } else {
            this.toastr.error('Error al crear la línea', 'Error');
          }
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
