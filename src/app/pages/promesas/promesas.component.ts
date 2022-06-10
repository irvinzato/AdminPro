import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const promesa = new Promise( ( resolve, reject ) => {
      if( false ) {
        resolve('Hola mi buen');
      } else {
        reject('Algo salio mal');
      }
    });

    promesa.then( (mensaje) => {
      console.log("Termine con ", mensaje);
    }).catch( error  => console.log('Error en promesa ', error) );

    console.log('Fin del init');
  }

}
