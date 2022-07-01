import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    nombre: [ 'Irving', [ Validators.required, Validators.minLength(3) ] ],
    email: [ 'irvingPrueba@gmail.com', [ Validators.required] ],
    password: [ '123456', [ Validators.required] ],
    password2: [ '123456', [ Validators.required] ],
    terminos: [ false , [ Validators.required] ]
  });

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    console.log(this.registerForm.value);
  }

}
