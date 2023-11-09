import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // inyectamos las dependencias
  private http = inject(HttpClient);

  // declaración de variables privadas
  private readonly baseUrl: string = environment.baseUrl;
  private _user = signal<User | null>(null); // valor por defecto nulo

  // declaración de variables publicas 
  // ¡no hay manera de cambiar el estado de estas variables ni pasan por referencia ni nada!
  public user = computed(() => this._user()); // devolvemos el valor de la señal de _currentUser
  

  // Realiza la solicitud de inicio de sesión al backend
  login(email: string, password: string): Observable<boolean> {
    // Define los datos de inicio de sesión
    const loginData = { email, password };
    // Realiza una solicitud HTTP POST al endpoint de inicio de sesión en el backend
    return this.http.post<{ token: string , user: any }>(`${this.baseUrl}/auth/login`, loginData).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);//Guardamos el token y email del usuario en el LocalStorage
          localStorage.setItem('email', email);
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

  getUserInfo(): Observable<User | null> {
    return this.http.get<User>(`${this.baseUrl}/auth`).pipe(
      map(response => {
        if (response) {
          // si hemos obtenido respuesta
          this._user.set(response);
          return response;
        }
        return null;
      }),
      catchError(error => {
        console.error('Error al obtener la información del usuario:', error);
        return of(null);
      })
    );
  }

  // Devuelve el token de acceso actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  updateUser(formData:User): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.put<any>(`${this.baseUrl}/auth`, formData,{headers}).pipe(
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

  checkActualPass(): Observable<boolean>{
    const token =localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any>(`${this.baseUrl}/auth/check-token`,{headers , responseType: 'text' as 'json'}).pipe(
      map(response => {
        if (response ) {
          return true;
        }
        return false;
      }),
      catchError(error => {
        // Manejar errores aquí, por ejemplo, mostrar un mensaje de error al usuario.
        console.error('Error al checkear la contraseña:', error);
        return of(false); // Devolver un valor observable con false
      })
    );
  }
}
