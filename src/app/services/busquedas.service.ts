import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hospital } from './../models/hospital.model';
import { Usuario } from './../models/usuario.model';


//La pongo aqui para no estar poniendo "this.baseUrl" cuando la ocupe, cuestion de gustos
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get getToken(): string {
    return localStorage.getItem('token') || '';
  }

  get getHeader() {
    return {
      headers: {
        'x-token': this.getToken
      }
    }
  }

  //Lo hago para poder mostrar la imagen, ya que en Usuarios lo hice mediante instanciacion
  private transformarUsuarios( resultados: any[] ): Usuario[] {
    return resultados.map(
      usuario => new Usuario(usuario.nombre, usuario.email, '', usuario.google, usuario.img, usuario.rol, usuario.uid)
    );
  }

  //Este lo puedo usar si quiero para mantener el tipado y saber que regresa algo de tipo "Hospital []"
  private transformarHospitales( resultados: any[] ): Hospital[] {
    return resultados;
  }

  buscar( tipo: 'usuarios'|'medicos'|'hospitales', termino: string ) {
    return this.http.get<any []>( `${ baseUrl }/todo/coleccion/${ tipo }/${ termino }`, this.getHeader )
          .pipe(
            map( (res: any) => {
              switch ( tipo ) {
                case 'usuarios':
                  return this.transformarUsuarios( res.resultados );
              
                case 'hospitales':
                  return res.resultados;

                case 'medicos':
                  return res.resultados;

                default:
                  return [];
              }
            })
          );
  }

}
