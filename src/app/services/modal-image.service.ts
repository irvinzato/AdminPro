import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  //Como voy a reutilizar el modal que cree para cargar imagenes(En usuarios, hospitales, medicos), le hago su propio servivio

  private _ocultarModal: boolean = true;

  public tipo! : string;
  public id!   : string;
  public img!  : string;

  constructor() { }

  get getOcultarModal() {
    return this._ocultarModal;
  }

  abrirModal( tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string = 'no-image' ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    if( img.includes('https') ) {
      this.img = img;
    } else {
      this.img = `${ baseUrl }/upload/${ tipo }/${ img }`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

}
