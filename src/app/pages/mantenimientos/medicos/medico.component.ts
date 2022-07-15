import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Hospital } from './../../../models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  doctorForm!: FormGroup;
  hospitals: Hospital [] = [];

  constructor( private fb: FormBuilder, private hospitalService: HospitalService ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      nombre: [ 'Probando', [Validators.required] ],
      hospital: [ '', [Validators.required] ]
    });

    this.loadHospitals();
  }

  loadHospitals() {
    this.hospitalService.cargarHospitales().subscribe(res => {
      this.hospitals = res;
    });
  }

  saveDoctor() {
    console.log(this.doctorForm.value);
  }

}
