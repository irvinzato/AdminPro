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

  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.usuarioService.cargarUsuarios(0).subscribe(({ totalRegistros, usuarios }) => {
      this.totalUsers = totalRegistros;
      this.usuarios = usuarios;
      console.log("Respuesta del servicio cargar usuarios ", this.totalUsers, " y ", this.usuarios);
    });
  }

}
