import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private token: string | null = null;
  public user: any= null;
  public idUsuario?:any;
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
          console.log(response)
          this.token = response.token;
          localStorage.setItem('token', this.token);//Guardamos el token y email del usuario en el LocalStorage
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
    return this.token;
  }

  updateUser(formData:User): Observable<boolean> {
    return this.http.put<any>(`${this.baseUrl}/auth`, formData).pipe(
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

  checkActualPass(actualPass:string): Observable<boolean>{
    const email =localStorage.getItem('email');
    const loginData = { email, actualPass };
    return this.http.post<{ token: string , user: any }>(`${this.baseUrl}/auth/login`, loginData).pipe(
      map(response => {
        if (response && response.token) {
          console.log('fino');
          //Guardamos el token del usuario en el LocalStorage
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

}
