import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from './../interfaces/login-form.interface';
import { Usuario } from './../models/usuario.model';

//Para poder utilizar el objeto que me ofrece Google
declare const google: any;

//La pongo aqui para no estar poniendo "this.baseUrl" cuando la ocupe, cuestion de gustos
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario!: Usuario;
  
  constructor( private http: HttpClient, private router: Router,
    private ngZone: NgZone ) { }
    
    renovarToken(): Observable<Boolean> {
      const token = localStorage.getItem('token') || '';
      return this.http.get( `${ baseUrl }/login/renew`, {
        headers: {
          'x-token': token
        }
      }).pipe(
        tap((res: any) => {
          console.log("Respuesta del servicio renovarToken, lo uso en el Guard ", res);

          const { email, google, img, nombre, rol, uid } = res.usuarioDB;

          this.usuario = new Usuario( nombre, email, '', google, img, rol, uid);
          this.usuario.imprimirNombre();
         
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
                    console.log("Respuesta desde el servicio de Google ", res);
                    localStorage.setItem('token', res.token);
                  })
                  );
                }
                
                logout() {
                  localStorage.removeItem('token');
                  //No importa si el correo existe o no, siempre realiza el procedimiento del callBack
                  //Aun que tambien pudiera considerar si es un usuario de Google para llamar esta instrucción o no
                  google.accounts.id.revoke( 'multizato@gmail.com', () => {
                    //Con el ngZone se quita el warning que marcaba en consola la aplicacion
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });
  }
  
}

//Tap es para jugar con los atributos de la respuesta y realizar operaciones nuevas
//Map es para trasnformar la respuesta del servicio, puedo cambiar la respuesta a mi gusto