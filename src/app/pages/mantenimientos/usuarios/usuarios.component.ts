import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { BusquedasService } from './../../../services/busquedas.service';
import { ModalImageService } from './../../../services/modal-image.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
//Variable que puedo ocupar para saber que usuario hizo Login y quitarle la opción de borrar con ngIf
  userId: string = '';

  totalUsers: number = 0;
  users: Usuario[] = [];
  usersTemp: Usuario[] = [];
  pag: number = 0;
  loading: boolean = true;

  constructor( private usuarioService: UsuarioService, private busquedaService: BusquedasService,
               private modalImageService: ModalImageService ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.userId = this.usuarioService.getUid;
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

  openModal( user: Usuario ) {
    //console.log(user);
    this.modalImageService.abrirModal( 'usuarios', user.uid!, user.img );
  }

  changeRole( user: Usuario ) {
    this.usuarioService.actualizarUsuario( user ).subscribe( res => {
      Swal.fire('Hecho', 'Actualización de rol correcta', 'success');
    });
  }

  deleteUser( usuario: Usuario ) {

    if( usuario.uid === this.usuarioService.getUid ) {
      Swal.fire('Error', 'No puedes borrarte a ti mismo', 'error');
      return;
    }
 
    Swal.fire({
      title: 'Eliminar usuario',
      text: `¿Estas seguro de eliminar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario( usuario ).subscribe( res => {
          this.loadUsers();
          Swal.fire(
            'Eliminado!',
            `Has eliminado al usuario ${ usuario.nombre }`,
            'success'
          );
        });
      }
    });
  }

}
