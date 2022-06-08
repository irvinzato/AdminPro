import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

  @Input() tittle: string = 'Sin titulo';
  @Input('labels') doughnutChartLabels: string[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data') datosGrafica: number[] = [50, 50, 0];
  
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.datosGrafica,
        backgroundColor: [ '#0A5DF5', '#1CE852', '#F59C18' ]
      }
    ]
  };
  doughnutChartType: ChartType = 'doughnut';

  constructor() { 
  }

  ngOnInit(){
    setTimeout(() => {
      this.doughnutChartData.labels = this.doughnutChartLabels;
      this.doughnutChartData.datasets[0].data = this.datosGrafica;
    }, 500);
  }

}
