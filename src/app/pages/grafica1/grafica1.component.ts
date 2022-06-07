import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {

  labels1: string[] = ['Armas automaticas', 'Armas manuales', 'Armas personalizadas'];
  data1: number[] = [100, 70, 20];

  labels2: string[] = ['Carros', 'Motos', 'Aviones'];
  data2: number[] = [50, 30, 20];

  constructor() { }

  ngOnInit(): void {
  }

}
