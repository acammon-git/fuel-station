import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/shared/services/navbar.service';

import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';
@Component({
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  private navbarService = inject(NavbarService);
  public formBuilder = inject(FormBuilder);
  public authService = inject(AuthService);
  public router = inject(Router);
  public profileForm: FormGroup = this.fb.group(
    {
      foto: [''],
      email: [''],
      nombre: ['', [Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
      pais: [''],
      telefono: [''],
      password: ['', [Validators.minLength(6)]],
      newPass1: [''],
      newPass2: [''],
  }
  );
  public showChangePassword = false;
  
  @ViewChild('userForm') userForm!: NgForm;
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator,
    private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.navbarService.title.set("Editar mi cuenta");
    this.navbarService.backUrl.set("");
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.profileForm, field );
  }
  
  toggleAdditionalFields() {
    this.showChangePassword = !this.showChangePassword;
  }

  submit(){
    const formData = this.profileForm.getRawValue();
    const fieldsToCheck = ['foto','email', 'nombre', 'pais','telefono','password', 'newPass1', 'newPass2'];
    const hasEmptyField = fieldsToCheck.some(
      (field) => formData[field] && formData[field].trim() !== ''
    );
    if (!hasEmptyField) {
      this.toastr.error('Debes completar al menos un campo', 'Error');
      return;
    }else if (this.showChangePassword) {
      this.authService.checkActualPass().subscribe(
        (response) => {
          if(formData.newPass1 === formData.newPass2){
            formData.password=formData.newPass1;
            delete formData.newPass1;
            delete formData.newPass2;
            delete formData.nombre;
            delete formData.email;
            delete formData.pais;
            delete formData.telefono;
            delete formData.foto;
            this.authService.updateUser(formData).subscribe({
              next: (response) => {
                console.log(response);
                this.toastr.success('Campo actualizado correctamente', 'Éxito');
              },
              error: (updateError) => {
                this.toastr.error('Error al actualizar los campos', 'Error');
                console.log(updateError);
              }
            });
          }
          
        },
        (error) => {
          console.error(error);
        });
    }else{
      if (this.profileForm.valid) {
        delete formData.password;
        delete formData.newPass1;
        delete formData.newPass2;
        if(formData.email == ''){
          delete formData.email;
        }
     
        this.authService.updateUser(formData).subscribe({
          next: (response) => {
            console.log(response);
            
            this.toastr.success('Campo actualizado correctamente', 'Éxito');
          },
          error: (updateError) => {
            this.toastr.error('Error al actualizar los campos', 'Error');
            console.log(updateError);
          }
        });
      } 
    }
  }
  checkAndSubcheckAndSubmit() {
  
    const formData = this.profileForm.getRawValue();
    
    const fieldsToCheck = ['foto', 'nombre', 'pais', 'password', 'newPass1', 'newPass2'];
    
    // Verifica si al menos un campo está completo
    const hasEmptyField = fieldsToCheck.some(
      (field) => formData[field] && formData[field].trim() !== ''
    );
  
    if (!hasEmptyField) {
      this.toastr.error('Debes completar al menos un campo', 'Error');
      return;
    }else if (this.showChangePassword) {
      const passControl = this.profileForm.get('password')?.value;
      const passFieldValue = passControl?.value;
  
      if (passFieldValue === '' || passFieldValue === null || passFieldValue === undefined) {
        // No se ingresó una contraseña actual, por lo que no se realiza la comprobación
        // y se continúa con la actualización de los campos.
      } else {
        this.profileForm.addControl('password', this.formBuilder.control('', Validators.required));
        const formData = this.profileForm.getRawValue();
        // Comprueba la contraseña actual y realiza la actualización si coincide
        this.authService.checkActualPass().subscribe({
          next: (passwordMatch) => {
            if (passwordMatch || this==this) {
              // Contraseña actual coincide, puedes continuar con la actualización
            
              this.authService.updateUser(formData).subscribe({
                next: (response) => {
                  
                  this.toastr.success('Campo actualizado correctamente', 'Éxito');
                },
                error: (updateError) => {
                  this.toastr.error('Error al actualizar la contraseña', 'Error');
                }
              });
            } else {
              this.toastr.error('La contraseña actual no coincide', 'Error');
            }
          },
          error: (passwordError) => {
            this.toastr.error('Error al comprobar la contraseña actual', 'Error');
          }
        });
      }
    }
  }
}
