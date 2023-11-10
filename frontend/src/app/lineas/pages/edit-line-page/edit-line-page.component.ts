import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/shared/services/navbar.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { LinesService } from '../../services/lines.service';

@Component({
  templateUrl: './edit-line-page.component.html',
  styleUrls: ['./edit-line-page.component.css']
})
export class EditLinePageComponent {
  //inyección de servicios
  private navbarService = inject(NavbarService);
  public linesService = inject(LinesService);
  public fb =  inject(FormBuilder);
  public validatorsService =  inject(ValidatorsService);
  public toastr =  inject(ToastrService);
  ngOnInit(): void {
    this.navbarService.title.set("Editar línea"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
  }
    constructor(
      ) {}
      //creamos los campos del formulario
      public formNewLine: FormGroup = this.fb.group(
      {
        
        nombre: [''],
        url: [''],
        imagen: [''],
        activo: [''],
    }
    );
    public router = inject(Router);
    @ViewChild('lineForm') lineForm!: NgForm;
    //submit recoge los datos del fomulario y hace una peticion post para crear una nueva línea
    submit(){
      if (this.formNewLine.valid) {
      const formData = this.formNewLine.getRawValue();
      const activoValue = this.formNewLine.get('activo')?.value;
      if (activoValue){
        formData.activo = 1;
      }else{
        formData.activo = 0;
      }
      console.log(formData);
      this.linesService.createLine(formData).subscribe({
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
  