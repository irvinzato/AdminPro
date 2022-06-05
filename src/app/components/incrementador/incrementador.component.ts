import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent  {

  //@Input('valor') progreso: number = 50;  Para definir el nombre que viene desde el padre
  @Input() progreso: number = 50;

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor( valor: number ) {
    if( this.progreso >= 100 && valor > 0 ) {
      return this.progreso = 100;
    }
    if( this.progreso <= 0 && valor < 0 ) {
      return this.progreso = 0;
    }
    return this.progreso = this.progreso + valor;
  }

}
