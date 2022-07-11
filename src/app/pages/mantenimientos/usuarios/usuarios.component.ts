import { Component, OnInit } from '@angular/core';

import { BusquedasService } from './../../../services/busquedas.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  totalUsers: number = 0;
  users: Usuario[] = [];
  usersTemp: Usuario[] = [];
  pag: number = 0;
  loading: boolean = true;

  constructor( private usuarioService: UsuarioService, private busquedaService: BusquedasService ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.usuarioService.cargarUsuarios( this.pag ).subscribe(({ totalRegistros, usuarios }) => {
      this.totalUsers = totalRegistros;
      this.users = usuarios;
      this.usersTemp = usuarios;
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
    this.loadUsers();
  }

  searchUsers( event: any ) {
    //console.log("Busqueda ", event.target.value);
    if( event.target.value.length === 0 ) {
      this.users = this.usersTemp;
      return;
    }

    this.busquedaService.buscar( 'usuarios', event.target.value ).subscribe( res => {
      //console.log("Respues de busqueda ", res);
      this.users = res;
    });
  }

}
