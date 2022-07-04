import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from './../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  //Uso viewChild para tomar la referencia local que puse en mi HTML al componente
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  formSubmitted = false;

  loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remember: [ false ]
  });

  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '452650851438-ejdjhff40ju2slev6k2fb54q1v92m2c6.apps.googleusercontent.com',
      callback: this.handleCredentialResponse
    });

    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    console.log("TOKEN DE GOOGLE: " + response.credential);
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
