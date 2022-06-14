import { filter, map } from 'rxjs/operators';
import { ActivationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {

  titulo!: string;

  constructor( private router: Router ) {
    this.getArgumentosRuta();
  }

  getArgumentosRuta() {
    //events es un Obs de las rutas el cual voy a empezar a filtrar con operadores rxjs para obtener la data que le estoy mandando(Se empieza suscribiendose y viendo que se recibe)
    this.router.events  
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
    .subscribe( res => {
      console.log( res );
      this.titulo = res.titulo;
      console.log("Titulo es ", this.titulo);
      document.title = `AdminPro - ${res.titulo}`;   //Para cambiar el nombre de la ventana en el navegador
    });
  }

}
