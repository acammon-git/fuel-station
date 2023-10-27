import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private token: string | null = null;
  public user: any= null;

  constructor(private http: HttpClient) {
    
  }
  // Realiza la solicitud de inicio de sesión al backend
  login(email: string, password: string): Observable<boolean> {
    // Define los datos de inicio de sesión
    const loginData = { email, password };
    console.log(loginData);
    // Realiza una solicitud HTTP POST al endpoint de inicio de sesión en el backend
    return this.http.post<{ token: string , user: any }>(`${this.baseUrl}/auth/login`, loginData).pipe(
      map(response => {
        if (response && response.token) {
          this.token = response.token;
          this.user = JSON.stringify(response.user);
          delete this.user.password;
          delete this.user.last_login;
          delete this.user.id_usuario;
          delete this.user.active;
          localStorage.setItem('token', this.token);//Guardamos el token del usuario en el LocalStorage
          localStorage.setItem('user', this.user);//Guardamos el token del usuario en el LocalStorage
          return true;
        }
        return false;
      }),
      catchError(error => {
        // Manejar errores aquí, por ejemplo, mostrar un mensaje de error al usuario.
        console.error('Error en la solicitud de inicio de sesión:', error);
        return of(false); // Devolver un valor observable con false
      })
    );
  }

  // Devuelve el token de acceso actual
  getToken(): string | null {
    return this.token;
  }
}
