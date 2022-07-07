import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  //Regresa un string con el nombre del archivo en caso correcto o false en caso de error con mensaje de error en consola
  async actualizarFoto( archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string ) {
    try {
      
      const url = `${ baseUrl }/upload/${ tipo }/${ id }`;
      //Esto es propio de JS(Por eso no importo nada, igual que el "file") para crear la data que quiero mandar el fetch
      const formData = new FormData();
      //El append es para añadir todas las propiedades que necesita mi EP en el body
      formData.append('imagen', archivo)

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      //En el fetch aqui viene la respuesta del EP "resp.json()"
      const data = await resp.json();

      if( data.ok ) {
        return data.nombreArchivo;
      } else {
        console.log( data.msg );
        return false;
      }

    } catch (error) {
      console.log(error);
     return false;
    }
  }

}
