import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formSubmitted = false;

  registerForm = this.fb.group({
    nombre: [ 'Mauricio', [ Validators.required, Validators.minLength(3) ] ],
    email: [ 'irving@prueba.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', [ Validators.required ] ],
    password2: [ '123456', [ Validators.required ] ],
    terminos: [ true , [ Validators.required, Validators.requiredTrue ] ]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if( this.registerForm.invalid ) {
      console.log('Formulario invalido');
      return;
    }
    //Formulario valido
    this.usuarioService.crearUsuario( this.registerForm.value ).subscribe( res => {
      console.log("Usuario creado");
      console.log("Respuesta del servicio ", res);
    }, (err) => console.warn( err.error.msg ) );
  }

  campoNoValido( campo: string ): boolean {
    if( this.registerForm.get(campo)?.invalid && this.formSubmitted ) {
      return true
    } else {
      return false;
    }
  }

  validarContrasenas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( (pass1 !== pass2)  && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1: string, pass2: string) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      //Si el "setErrors" de cualquier valor del formulario trae alguna variable diferente de "null", siempre sera invalido el formulario
      if( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: false });
      }
    }
  }

  aceptarTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }


}
