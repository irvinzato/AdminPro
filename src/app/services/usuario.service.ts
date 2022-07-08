import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from './../interfaces/login-form.interface';
import { Usuario } from './../models/usuario.model';

//Para sección de "Mantenimiento"
import { CargarUsuarios } from './../interfaces/cargar-usuarios.interface';

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

  //Creé los get´s para no duplicar código y pueda usar el token donde sea necesario
  get getToken(): string {
    return localStorage.getItem('token') || '';
  }

  get getUid(): string {
    return this.usuario.uid || '';
  }

  get getHeader() {
    return {
      headers: {
        'x-token': this.getToken
      }
    }
  }
    
  renovarToken(): Observable<Boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get( `${ baseUrl }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((res: any) => { //Quite el tap y deje solo el map por que puede ser que el map resuelva primero antes que el tap, para evitar ese tipo de errores
        //console.log("Respuesta del servicio renovarToken, lo uso en el Guard ", res);
        const { email, google, img = '', nombre, rol, uid } = res.usuarioDB;

        this.usuario = new Usuario( nombre, email, '', google, img, rol, uid);
        this.usuario.imprimirNombre();
        
        localStorage.setItem('token', res.token);
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

  actualizarPerfil( data: {email: string, nombre: string, rol: string} ) {
    //Aqui digo data va a ser todo lo que trae data mas el "rol" que saque de mi usuario, por que en mi BackEnd puse obligatorio el campo del rol
    data = { ...data, rol: this.usuario.rol || '' };
    return this.http.put(`${ baseUrl }/usuarios/${ this.getUid }`, data, {
      headers: {
        'x-token': this.getToken //Los metodos get se mandan a llamar sin parentesis "()"
      }
    });
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
        /* this.usuario.img = res.picture;
        console.log(this.usuario.img); */
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

  cargarUsuarios( desde: number = 0 ) {
    return this.http.get<CargarUsuarios>( `${ baseUrl }/usuarios?desde=${ desde }`, this.getHeader )
           .pipe(
            map( res => {
              //Hago la intancia de usuarios para poder mostrar la imagen en la tabla
              const usuarios = res.usuarios.map( usuario => new Usuario(usuario.nombre, usuario.email, '', usuario.google, usuario.img, usuario.rol, usuario.uid) )
              return {
                totalRegistros: res.totalRegistros,
                usuarios
              };
            })
           );
  }
  
}

//Tap es para jugar con los atributos de la respuesta y realizar operaciones nuevas
//Map es para trasnformar la respuesta del servicio, puedo cambiar la respuesta a mi gusto