import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

import { UsuarioService } from './../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private usuarioService: UsuarioService, private router: Router ) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Boolean | any{
    //console.log('Paso por el canActivate del guard auth, true deja mostrar las rutas, false las bloquea');
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
    
    //El canLoad es muy parecido al canActivate, solo cargara la ruta si el usuario tiene permiso de activarla
    canLoad(route: Route, segments: UrlSegment[]): Boolean | any  {
      
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
