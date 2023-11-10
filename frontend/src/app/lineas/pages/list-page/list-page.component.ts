import { Component, OnInit, inject } from '@angular/core';
import { NavbarService } from '../../../shared/services/navbar.service';
import { LinesService } from '../../services/lines.service';
import { EditLineService } from 'src/app/shared/services/edit-line.service';
import { Router } from '@angular/router';
import { Lines } from 'src/app/shared/interfaces/lines.interface';
@Component({
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{
  // inyección de dependencias
  private navbarService = inject(NavbarService);
  public editLineService= inject(EditLineService);
  // declaración de variables
  public dtOptions:DataTables.Settings={};
  public data: any[] = [];
  public linesService=inject(LinesService);
  constructor(
    private router: Router
  ) {}
  ngOnInit(): void {
    this.navbarService.title.set("Ver todas las líneas"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10 
    };
    
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
  }
  cargarDatosLineaSeleccionada(linea: Lines) {

    this.editLineService.setCargarDatosLineaSeleccionada(linea);
    this.router.navigate(['/lineas/edit', linea.id_linea], { state: { linea: linea } });
    // Puedes hacer algo más aquí si es necesario
  }
}

