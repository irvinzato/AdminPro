import { Component, OnInit } from '@angular/core';

import { UsuarioService } from './../../services/usuario.service';
import { SidebarService } from './../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  imgUrl: string = '';
  nameUser: string = '';

  constructor( private sidebarService: SidebarService, private usuarioService: UsuarioService ) {
    this.menuItems = sidebarService.menu;
    //Como es un get el ".imagenUrl" no necesito los parentesis "()"
    this.imgUrl = usuarioService.usuario.imagenUrl;
    this.nameUser = usuarioService.usuario.nombre;
   }

  ngOnInit(): void {
    //console.log(this.menuItems);
  }

}
