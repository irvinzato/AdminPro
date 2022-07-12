import { Component, OnInit } from '@angular/core';

import { Hospital } from './../../../models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitals: Hospital [] = [];
  load: boolean = true;

  constructor( private hospitalService: HospitalService ) { }

  ngOnInit(): void {
    this.loadingHospitals();
  }
  
  loadingHospitals() {
    this.load = true;
    this.hospitalService.cargarHospitales().subscribe(res => {
      this.hospitals = res;
      this.load = false;
    });
  }

}
