import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor( private usuarioService: UsuarioService, private router: Router ) {
    //Aqui no ocupa el "... = new Usuario(...)" por que ya es una instancia en el servicio
    this.usuario = usuarioService.usuario;
   }

  logout() {
    this.usuarioService.logout();
  }

  search( term: string ) {
    if( term.trim().length === 0) {
      this.router.navigateByUrl(`/dashboard`);
    } else {
      this.router.navigateByUrl(`/dashboard/buscar/${term.trim()}`);
    }
  }

}
