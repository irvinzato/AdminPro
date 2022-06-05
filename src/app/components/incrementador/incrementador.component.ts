import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent  {

  @Input('valor') progreso: number = 50;  //Para definir el nombre que viene desde el padre
  //@Input() progreso: number = 50;       //Otra forma de recibir la variable desde el padre

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor( valor: number ) {
    if( this.progreso >= 100 && valor > 0 ) {
      this.valorSalida.emit( 100 );
      return this.progreso = 100;
    }
    if( this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit( 0 );
      return this.progreso = 0;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit( this.progreso  );
    return this.progreso;
  }

}
