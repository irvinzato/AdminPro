import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';


const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  //Recordatorio: Este EndPoint no tiene paginación, la puedo implementar si la ocupo
  //La carga de imagenes en hospitales la hare mediante un pipe para tener un proceso diferente a usuarios(En usuarios instancie el objeto para mostrar imagen)
  cargarHospitales() {
    return this.http.get<Hospital []>(`${ baseUrl }/hospitales`, this.getHeader)
            .pipe(
              map((res: any) => {
                return res.hospitales;
              })
            );
  }

  crearHospital( nombre: string ) {
    return this.http.post( `${ baseUrl }/hospitales`, nombre, this.getHeader );
 
  }

  actualizarHospital( id: string, nombre: string ) {
    return this.http.put( `${ baseUrl }/hospitales/${ id }`, nombre, this.getHeader );
  }

  borrarHospital( id: string ) {
    return this.http.delete( `${ baseUrl }/hospitales/${ id }`, this.getHeader );
  }

}
