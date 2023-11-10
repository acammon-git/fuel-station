import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Lines } from 'src/app/shared/interfaces/lines.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LinesService {
  private readonly baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {
    
  }
  createLine(formData:FormData): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}/lines`, formData).pipe(
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
  viewLines(): Observable<any> { // Cambia el tipo de retorno a 'any' para los datos
    return this.http.get<any>(`${this.baseUrl}/lines/all`).pipe(
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

  updateLine(formData:Lines,id:number): Observable<boolean> {
    
    return this.http.put<any>(`${this.baseUrl}/lines/${id}`, formData).pipe(
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

  
  
  
}
