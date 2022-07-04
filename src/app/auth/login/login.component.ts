import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSubmitted = false;

  loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remember: [ false ]
  });

  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }

  login() {
    
    this.usuarioService.loginUsuario( this.loginForm.value ).subscribe( res => {
      console.log("Login exitoso ", res );
      if( this.loginForm.get('remember')?.value ) {
        localStorage.setItem('email', this.loginForm.get('email')?.value);
      } else {
        localStorage.removeItem('email');
      }
    }, (error) => {
      Swal.fire( 'Error', error.error.msg, 'error' );
    });
    //this.router.navigateByUrl('/dashboard');
  }

}
