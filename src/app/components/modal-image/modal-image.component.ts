import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ModalImageService } from './../../services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {
  //Utilice esta referencia local para limpiar bien el campo del selector de la imagen al cerrar el modal
  @ViewChild('inputFile') inputFile!: ElementRef;

  selectedImage!: File;
  imgTemp: any = '';
  

  //Si injecto publico el servicio puedo usar la propiedad en el HTML y pasar datos por referencia
  constructor( public modalImageService: ModalImageService ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = '';
    this.inputFile.nativeElement.value = '';
    this.modalImageService.cerrarModal();
  }

  changeImage( event: any ) {
    //El event del metodo hay que explorarlo, la imagne esta dentro de "event.target.files"
    this.selectedImage = event.target.files[0];
    console.log("VARIABLE TIPO FILE ", this.selectedImage);
    if( !this.selectedImage ) { 
      //Si el usuario cancela la imagen entonces otra ves dejo vacia la imagen temporal y mostraria la que ya tiene actualmente 
      this.imgTemp = ''; 
      return; 
    }
    //Esto es para mostrar la imagen seleccionada previamente(No ocupa importaciones por que es propio de Js)
    const reader = new FileReader();
    reader.readAsDataURL( this.selectedImage );

    reader.onloadend = () => {
      //console.log("Resultado del reader", reader.result);
      this.imgTemp = reader.result;
    }
  }

}