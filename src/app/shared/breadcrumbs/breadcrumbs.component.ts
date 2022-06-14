import { ActivationEnd, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {

  titulo!: string;
  tituloSubs$: Subscription;

  constructor( private router: Router ) {
    this.tituloSubs$ = this.getArgumentosRuta()
                      .subscribe( res => {
                        console.log( res );
                        this.titulo = res.titulo;
                        console.log("Titulo es ", this.titulo);
                        document.title = `AdminPro - ${res.titulo}`;   //Para cambiar el nombre de la ventana en el navegador
                      });
  }
  ngOnDestroy(): void {
    console.log("Esto es para que se elimine la promesa al salir y volver a entrar a la pagina, para evitar tener mas de 1 Observable de este tipo")
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    //events es un Obs de las rutas el cual voy a empezar a filtrar con operadores rxjs para obtener la data que le estoy mandando(Se empieza suscribiendose y viendo que se recibe)
    return this.router.events  
    .pipe(
      filter( res => {
        return res instanceof ActivationEnd 
      }),
      filter( (res: any) => {
        return res.snapshot.firstChild == null;
      }),
      map( (res: any) => {
        return res.snapshot.data;
      }),
    )
  }

}
