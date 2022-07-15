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
  selectedHospital!: Hospital | undefined;

  constructor( private fb: FormBuilder, private hospitalService: HospitalService ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      nombre: [ 'Probando', [Validators.required] ],
      hospital: [ '', [Validators.required] ]
    });

    this.loadHospitals();

    this.doctorForm.get('hospital')?.valueChanges.subscribe( hospitalId => {
      //console.log("Respues del Observable valueChanges en hospital, me da el id del hospital seleccionado ", hospitalId);
      //El metodo "find" es mas eficiente que "filter", al encontrar el primer valor que coincida termina
      this.selectedHospital = this.hospitals.find( hospital => {
        return hospital._id === hospitalId;
      });
    });
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
