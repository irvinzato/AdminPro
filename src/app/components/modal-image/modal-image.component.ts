import { Component, OnInit } from '@angular/core';

import { ModalImageService } from './../../services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  //Si injecto publico el servicio puedo usar la propiedad en el HTML y pasar datos por referencia
  constructor( public modalImageService: ModalImageService ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalImageService.cerrarModal();
  }

}
