import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';


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

  buscar( tipo: 'usuarios'|'medicos'|'hospitales', termino: string ) {
    return this.http.get<any []>( `${ baseUrl }/todo/coleccion/${ tipo }/${ termino }`, this.getHeader )
          .pipe(
            map( (res: any) => {
              return res.resultados;
            })
          );
  }

}
