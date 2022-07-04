import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from './../interfaces/login-form.interface';

//La pongo aqui para no estar poniendo "this.baseUrl" cuando la ocupe, cuestion de gustos
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //Tap es para jugar con los atributos de la respuesta y realizar operaciones nuevas
  //Map es para trasnformar la respuesta del servicio, puedo cambiar la respuesta a mi gusto

  constructor( private http: HttpClient ) { }

  renovarToken(): Observable<Boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get( `${ baseUrl }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map( res => {
        return true;
      }),
      catchError( error => {
        return of(false);
      })
    );
  }

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

  loginGoogle( token: string ) {
    /* console.log("TOKEN COMO STRING ", token);
    console.log("TOKEN COMO OBJETO { token } ", { token }); */
    return this.http.post( `${ baseUrl }/login/google`, { token } )
            .pipe(
              tap( (res: any) => {
                console.log("Respuesta desde el servicio ", res);
                localStorage.setItem('token', res.token);
              })
            );
  }

}
