import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent  {

  progreso1: number = 25;
  progreso2: number = 35;

  get getProgreso1() {
    return `${this.progreso1}%`;
  }

  get getProgreso2() {
    return `${this.progreso2}%`;
  }

  cambioValorHijo( valor: number ) { //Podria hacer asi pero es mejor hacer el cambio directo en el html (valorSalida)="progreso1 = $event" 
    console.log("Cambio valor ", valor);
    this.progreso1 = valor;
  }

}
