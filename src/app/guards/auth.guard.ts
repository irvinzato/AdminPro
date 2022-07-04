import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';

import { UsuarioService } from './../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  respuestaServicio: boolean = false;
  constructor( private usuarioService: UsuarioService, private router: Router ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Boolean | any{
      console.log('Paso por el canActivate del guard auth, true deja mostrar las rutas, false las bloquea');
      return this.usuarioService.renovarToken()
            .pipe(
              tap( res => {
                //Si es false, no esta autenticado y lo mando al login
                if( !res ) {
                  this.router.navigateByUrl('/login');
                }
              })
            );
  }
  
}
