import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda-total',
  templateUrl: './busqueda-total.component.html',
  styleUrls: ['./busqueda-total.component.css']
})
export class BusquedaTotalComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      console.log(params.term);
    });
  }

}
