import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService ) { 
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
    });
  }

}
