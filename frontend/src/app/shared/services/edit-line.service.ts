import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditLineService {
  private lineaSeleccionada: any;

  setCargarDatosLineaSeleccionada(linea: any): void {
    this.lineaSeleccionada = { ...linea };
  }

  getCargarDatosLineaSeleccionada(): any {
    return this.lineaSeleccionada;
  }
  constructor() { }
}
