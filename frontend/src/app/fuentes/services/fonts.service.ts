import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { Fonts } from 'src/app/shared/interfaces/fonts.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FontsService {

  private readonly baseUrl: string = environment.baseUrl;
  private fuenteSeleccionada: any;
  constructor(private http: HttpClient) {

  }
  createFont(formData: FormData): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}/fonts-lines`, formData).pipe(
      map(response => {
        console.log(response)
        // this.serviceToast.showToast('bg-green-600', 'Éxito', response.message);
        return true;
      }),
      catchError(({ error }) => {
        console.log(error)
        return of(false);
      })
    );
  }
  viewFonts(): Observable<any> { // Cambia el tipo de retorno a 'any' para los datos
    return this.http.get<any>(`${this.baseUrl}/fonts-lines/all`).pipe(
      map(response => {
        // this.serviceToast.showToast('bg-green-600', 'Éxito', response.message);
        return response; // Retorna el objeto completo
      }),
      catchError(({ error }) => {
        console.log(error);
        return of(false);
      })
    );
  }

  updateFont(formData: Fonts, id: number): Observable<boolean> {

    return this.http.put<any>(`${this.baseUrl}/fonts-lines/${id}`, formData).pipe(
      map(response => {
        console.warn("respuesta del put", response);
        console.log(response)
        // this.serviceToast.showToast('bg-green-600', 'Éxito', response.message);
        return true;
      }),
      catchError(({ error }) => {
        return of(false);
      })
    );
  }
  setCargarDatosFuenteSeleccionada(fuente: any): void {
    this.fuenteSeleccionada = { ...fuente };
  }

  getCargarDatosFuenteSeleccionada(): any {
    return this.fuenteSeleccionada;
  }
}
