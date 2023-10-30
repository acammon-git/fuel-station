import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/shared/services/navbar.service';
import { User } from '../../../shared/interfaces/user.interface';
import { catchError, map, of } from 'rxjs';

@Component({
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  private navbarService = inject(NavbarService);
  public userData: User = {
    email: '',
    foto: '',
    nombre: '',
    pais: '',
    telefono: '',
    password:'',
  };

  public showAdditionalFields = false;
  public actualPass='';
  public newPass1='';
  public newPass2='';
  @ViewChild('userForm') userForm!: NgForm;


  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.navbarService.title.set("Editar mi cuenta");
    this.navbarService.backUrl.set("");
  }
  

  submitForm() {
    const formData = this.userForm.value;
    const fieldsToCheck = [
      'nombre',
      'pais',
      'foto',
      'actualPass',
      'newPass1',
      'newPass2',
    ];
  
    // Verifica si al menos un campo está completo
    const hasNonEmptyField = fieldsToCheck.some(
      (field) => formData[field] && formData[field].trim() !== ''
    );
    console.log(hasNonEmptyField);
  
    if (!hasNonEmptyField) {
      console.log('Debes completar al menos un campo');
      return of(null); // Devuelve un observable vacío o con un valor nulo
    }
  
    const token = localStorage.getItem('token');
    // Reemplaza con el ID del usuario que deseas editar
    const dataToUpdate: User = {
      email: formData.email || '',
      foto: formData.foto || '',
      nombre: formData.nombre || '',
      pais: formData.pais || '',
      telefono: formData.telefono || '',
      password: formData.password || '',
    };
  
    if (!token) {
      this.router.navigate(['/auth/login']);
      return of(null); // Devuelve un observable vacío o con un valor nulo
    }
  
    // Agrega el token a los encabezados de la solicitud HTTP
    const headers = { 'x-token': token };
    console.log(token)
    // Realiza la solicitud HTTP con los encabezados incluidos
    return this.httpClient.put(`http://localhost:3000/auth`, dataToUpdate, { headers }).pipe(
      map((response) => {
        if (response instanceof Error) {
          throw new Error('Error al editar los campos ' + response.message);
        } else {
          console.log('Campos editados con éxito', response);
          return response; // Puedes retornar la respuesta si es necesario
        }
      }),
      catchError((error) => {
        console.error('Error al editar los campos', error);
        throw error; // Puedes lanzar el error si es necesario
      })
    );
  }
}
