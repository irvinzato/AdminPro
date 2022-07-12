import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  //Como voy a reutilizar el modal que cree para cargar imagenes(En usuarios, hospitales, medicos), le hago su propio servivio

  private _ocultarModal: boolean = true;

  constructor() { }

  get getOcultarModal() {
    return this._ocultarModal;
  }

  abrirModal() {
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

}
