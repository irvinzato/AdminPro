import { Component } from '@angular/core';

import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //Aqui lo resuelvo mediante una instancia al objeto, en el sidebar lo resulvo un poco diferente
  usuario!: Usuario;

  constructor( private usuarioService: UsuarioService ) {
    //Aqui no ocupa el "... = new Usuario(...)" por que ya es una instancia en el servicio
    this.usuario = usuarioService.usuario;
   }

  logout() {
    this.usuarioService.logout();
  }

}
