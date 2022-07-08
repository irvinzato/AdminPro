import { Component, OnInit } from '@angular/core';

import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from './../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  totalUsers: number = 0;
  usuarios: Usuario[] = [];
  pag: number = 0;
  loading: boolean = true;

  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.loading = true;
    this.usuarioService.cargarUsuarios( this.pag ).subscribe(({ totalRegistros, usuarios }) => {
      this.totalUsers = totalRegistros;
      this.usuarios = usuarios;
      this.loading = false;
      //console.log("Respuesta del servicio cargar usuarios ", this.totalUsers, " y ", this.usuarios);
    });
  }

  changePage( from: number ) {
    this.pag += from;
    if( this.pag < 0 ) {
      this.pag = 0;
    }
    if( this.pag >= this.totalUsers ) {
      this.pag -= from;
    }
    this.cargarUsuario();
  }

}
