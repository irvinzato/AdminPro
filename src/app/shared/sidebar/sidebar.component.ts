import { Component, OnInit } from '@angular/core';

import { UsuarioService } from './../../services/usuario.service';
import { SidebarService } from './../../services/sidebar.service';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  usuario: Usuario;
  imgUrl: string = '';
  nameUser: string = '';

  constructor( private sidebarService: SidebarService, private usuarioService: UsuarioService ) {
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
    /* Como es un get el ".imagenUrl" no necesito los parentesis "()" (Es una manera de hacerlo pero no eficiente, por eso mejor usa la instancia)
    this.imgUrl = usuarioService.usuario.imagenUrl;
    this.nameUser = usuarioService.usuario.nombre; */
   }

  ngOnInit(): void {
    
  }

}
