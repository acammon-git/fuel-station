import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
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
  public profileForm: FormGroup = this.fb.group({
      foto: [''],
      email: ['', [  Validators.pattern( this.validatorsService.emailPattern )], [this.emailValidator]],
      nombre: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern)]],
      pais: [''],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
      newPass1: [''],
      newPass2: [''],
  }, {
    validators: [
      this.passwordsMatchValidator(
        (profileForm) => {
          const newPass1 = profileForm.get('newPass1')?.value;
          const newPass2 = profileForm.get('newPass2')?.value;
          return newPass1 !== '' && newPass1 === newPass2;
        },
        this.validatorsService.isFieldOneEqualFieldTwo('newPass1', 'newPass2')
      ),
      // Agrega más validadores condicionales según tus necesidades
    ],
  });

  public showAdditionalFields = false;
  public actualPass = '';
  public newPass1 = '';
  public newPass2 = '';
  public authService = inject(AuthService);
  public router = inject(Router);

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
  passwordsMatchValidator(formGroup: FormGroup): { passwordsNotMatching: boolean } | null {

    if (this.newPass1.valueOf() && this.newPass2.valueOf() && this.newPass1.valueOf() !== this.newPass2.valueOf()) {
      return { passwordsNotMatching: true };
    }

    return null;
  }

  toggleAdditionalFields() {
    this.showAdditionalFields = !this.showAdditionalFields;
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
    }else if (this.showAdditionalFields) {
      const passControl = this.profileForm.get('password');
      const passFieldValue = passControl?.value;
  
      if (passFieldValue === '' || passFieldValue === null || passFieldValue === undefined) {
        // No se ingresó una contraseña actual, por lo que no se realiza la comprobación
        // y se continúa con la actualización de los campos.
      } else {
        this.profileForm.addControl('password', this.formBuilder.control('', Validators.required));
        const formData = this.profileForm.getRawValue();
        // Comprueba la contraseña actual y realiza la actualización si coincide
        this.authService.checkActualPass(passFieldValue).subscribe({
          next: (passwordMatch) => {
            if (passwordMatch || this.newPass1==this.newPass2) {
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
    }else{
      if (this.profileForm.valid) {
        delete formData.password;
        delete formData.newPass1;
        delete formData.newPass2;
        this.authService.updateUser(formData).subscribe({
          next: (response) => {
            // Si sale bien, metemos en localStorage el token
            this.toastr.success('Campo actualizado correctamente', 'Éxito');
          },
          error: (updateError) => {
            this.toastr.error('Error al actualizar los campos', 'Error');
            console.log(updateError);
          }
        });
      } 
    }
  
    
    // Realiza la comprobación de la contraseña actual
  
    
  }
}
