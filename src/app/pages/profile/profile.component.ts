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
      nombre: [ '123', [ Validators.required ] ],
      email: [ '123', [ Validators.required, Validators.email ] ]
    });
  }

  updateProfile() {
    console.log( this.profileForm.value );
    this.usuarioService.actualizarPerfil( this.profileForm.value ).subscribe( res => {
      console.log("Respues del servicio actualizar perfil desde el componente ", res);
    });
  }

}
