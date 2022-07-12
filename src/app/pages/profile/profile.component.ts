import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from './../../services/file-upload.service';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  usuario: Usuario;
  selectedImage!: File;
  imgTemp: any = '';

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [ this.usuario.nombre , [ Validators.required ] ],
      email: [ this.usuario.email , [ Validators.required, Validators.email ] ]
    });
  }

  updateProfile() {
    this.usuarioService.actualizarPerfil( this.profileForm.value ).subscribe( res => {
      console.log("Respues del servicio actualizar perfil desde el componente ", res);
      const { nombre, email } = this.profileForm.value;
      //Aun que parece que es un objeto local, en realdiad modifica todos los valores de la instancia(Por eso se refleja el cambio en el sidebar y header al instante)
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire('Cambios de datos exitosos', '', 'success');
    }, (error) => {
      //console.log(error);
      Swal.fire(`Error ${error.status}`, error.error.msg, 'error');
    });
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
    this.fileUploadService.actualizarFoto( this.selectedImage, 'usuarios', this.usuario.uid! )
    .then( res =>  {
      console.log("Respuesta en el componente para subir imagen ", res);
      //Como el objeto pasa por referencia actualiza en todos los lugares
      if( res.includes('No') ) {
        Swal.fire(`Error`, res, 'error');
        return;
      }
      this.usuario.img = res;
      Swal.fire('Cambio de imagen exitosa', '', 'success');
    });
  }

}
