import { EditLineService } from './../../../shared/services/edit-line.service';
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
  public router = inject(Router);
  public validatorsService =  inject(ValidatorsService);
  public toastr =  inject(ToastrService);
  public editLineService= inject(EditLineService);
  //declaración de variables
  public data: any[] = [];
  public dtOptions:DataTables.Settings={};
  public lineaSeleccionada: any;
  //creamos los campos del formulario
  public formNewLine: FormGroup = this.fb.group(
    {
      
      nombre: [''],
      url: [''],
      imagen: [''],
      activo: [''],
  }
  );
  ngOnInit(): void {
    this.navbarService.title.set("Editar línea"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
  //suscribimos para que se cargen todas las líneas
    this.linesService.viewLines().subscribe(
      (response) => {
        console.log(response);
        this.data = response;
      },
      (error) => {
        console.error(error);
      }
    );
    this.cargarDatosLineaSeleccionada( history.state.linea);
  }
    constructor() {}
    cargarDatosLineaSeleccionada(linea: any) {
      this.editLineService.setCargarDatosLineaSeleccionada(linea);
      this.lineaSeleccionada = this.editLineService.getCargarDatosLineaSeleccionada();
      this.formNewLine.patchValue(this.lineaSeleccionada);
      
    }
  
      
    
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
      console.log(formData,'objeto:',this.lineaSeleccionada);
      this.linesService.updateLine(formData,this.lineaSeleccionada.id_linea).subscribe({
        next: (response) => {
          if (response){
          this.toastr.success('Línea creada correctamente', 'Éxito');
          }else{
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
  