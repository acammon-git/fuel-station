import { Component, OnInit, inject } from '@angular/core';
import { NavbarService } from '../../../shared/services/navbar.service';
import { Fonts } from 'src/app/shared/interfaces/fonts.interface';
import { FontsService } from '../../services/fonts.service';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
@Component({
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{
  // inyección de dependencias
  private navbarService = inject(NavbarService);
  private fontsService = inject(FontsService);
  public router = inject(Router);
  //declaración de variables
  public dtOptions: DataTables.Settings={};
  public data: any[] = [];
  ngOnInit(): void {
    this.navbarService.title.set("Todas las fuentes"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10 
    };
    //suscribimos para que se cargen todas las fuentes
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
  cargarDatoFuenteSeleccionada(fuente: Fonts) {

    this.fontsService.setCargarDatosFuenteSeleccionada(fuente);
    this.router.navigate(['/fuentes/edit', fuente.id_linea], { state: { fuente: fuente } });
    // Puedes hacer algo más aquí si es necesario
  }
}
