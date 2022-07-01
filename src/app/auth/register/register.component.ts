import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formSubmitted = false;

  registerForm = this.fb.group({
    nombre: [ 'Irving', [ Validators.required, Validators.minLength(3) ] ],
    email: [ 'irving@prueba.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', [ Validators.required ] ],
    password2: [ '123456', [ Validators.required ] ],
    terminos: [ false , [ Validators.required, Validators.requiredTrue ] ]
  });

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if( this.registerForm.valid ) {
      console.log('Posteando formulario');
    } else {
      console.log('El formulario no es correcto');
    }

  }

  campoNoValido( campo: string ): boolean {
    if( this.registerForm.get(campo)?.invalid && this.formSubmitted ) {
      return true
    } else {
      return false;
    }
  }

  aceptarTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

}
