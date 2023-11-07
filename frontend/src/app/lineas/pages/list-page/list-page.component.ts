import { Component, OnInit, inject } from '@angular/core';
import { NavbarService } from '../../../shared/services/navbar.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{
  // inyección de dependencias
  private navbarService = inject(NavbarService);
  private http = inject(HttpClient);
  // declaración de variables
  public dtOptions:DataTables.Settings={};
  public data: any[] = [];
  

  ngOnInit(): void {
    this.navbarService.title.set("Ver todas las líneas"); // el título será "Líneas"
    this.navbarService.backUrl.set(""); // no hay url para volver atrás
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10 
    };
    this.http.get<any[]>('../../assets/lista.json').subscribe(data => {
      this.data = data;
    });
  }
  }

