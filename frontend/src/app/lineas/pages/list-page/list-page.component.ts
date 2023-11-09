import { Component, OnInit, inject } from '@angular/core';
import { NavbarService } from '../../../shared/services/navbar.service';
import { HttpClient } from '@angular/common/http';
import { LinesService } from '../../services/lines.service';

@Component({
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{
  // inyección de dependencias
  private navbarService = inject(NavbarService)
  // declaración de variables
  public dtOptions:DataTables.Settings={};
  public data: any[] = [];
  public linesService=inject(LinesService);

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
  }

