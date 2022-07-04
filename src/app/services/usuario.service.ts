import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from './../interfaces/login-form.interface';

//La pongo aqui para no estar poniendo "this.baseUrl" cuando la ocupe, cuestion de gustos
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post( `${ baseUrl }/usuarios`, formData )
            .pipe(
              tap( (res: any) => {
                localStorage.setItem('token', res.token);
              })
            );
  }

  loginUsuario( formData: LoginForm ) {
    return this.http.post( `${ baseUrl }/login`, formData )
            .pipe(
              tap( (res: any) => {
                localStorage.setItem('token', res.token);
              })
            );
  }

}
