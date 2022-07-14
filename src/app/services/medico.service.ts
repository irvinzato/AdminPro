import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Medico } from './../models/medico.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  obtenerMedicos() {
    return this.http.get<Medico []>(`${ baseUrl }/medicos`, this.getHeader)
           .pipe(
            map((res: any) => {
              return res.medicos;
            })
           );
  }

  //El BackEnd si recibe información extra en el body la va a ignorar
  crearMedico( medico: Medico ) {
    return this.http.post(`${ baseUrl }/medicos`, medico, this.getHeader);
  }

  actualizarMedico( medico: Medico ) {
    return this.http.put(`${ baseUrl }/medicos/${ medico._id }`, medico, this.getHeader);
  }

  borrarMedico( medico: Medico ) {
    return this.http.put(`${ baseUrl }/medicos/${ medico._id }`, this.getHeader);
  }


}
