import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from './../../../models/hospital.model';
import { Medico } from './../../../models/medico.model';
import { HospitalService } from './../../../services/hospital.service';
import { MedicoService } from './../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  doctorForm!: FormGroup;
  hospitals: Hospital [] = [];
  selectecDoctor!: Medico;
  selectedHospital!: Hospital | undefined;

  constructor( private fb: FormBuilder, private hospitalService: HospitalService,
               private medicoService: MedicoService, private router:Router ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      nombre: [ '', [Validators.required] ],
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
    this.medicoService.crearMedico( this.doctorForm.value ).subscribe((res: any) => {
      Swal.fire('Creación exitosa', `${this.doctorForm.value.nombre} creado correctamente`, 'success');
      this.router.navigateByUrl(`/dashboard/medico/${ res.medico._id }`);
    });
  }

}
