import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from './../../services/file-upload.service';
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
  constructor( public modalImageService: ModalImageService, private fileUploadService: FileUploadService ) { }

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

  updateImage() {
    const tipe = this.modalImageService.tipo;
    const id = this.modalImageService.id;

    this.fileUploadService.actualizarFoto( this.selectedImage, tipe, id )
    .then( res => {
      if( res.includes('No') ) {
        Swal.fire(`Error`, res, 'error');
        return;
      }
      Swal.fire('Cambio de imagen exitosa', '', 'success');
      //Esto lo hago para que un Observable emita la respuesta del servicio y en usuario actualice la imagen automaticamente
      this.modalImageService.nuevaImagen.emit(res);
      this.closeModal();
    });
  }

}