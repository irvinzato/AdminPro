import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedDoctor!: Medico;
  selectedHospital!: Hospital | undefined;

  constructor( private fb: FormBuilder, private hospitalService: HospitalService,
               private medicoService: MedicoService, private router:Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      //console.log("Todos los parametros que estan en mi ruta mediante activatedRoute ", params);
      if( params.id !== 'nuevo' ){
        this.loadDoctor( params.id );
      }
    });

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

  loadDoctor( id: string ) {
    this.medicoService.obtenerMedicoPorId( id ).subscribe(medico => {
      this.selectedDoctor = medico;
      //Desestructuro el objeto medico por eso tengo que llamar igual las variales del "const"
      const { nombre, hospital: { _id } } = medico;
      console.log("DESESTRUCTURACION", nombre, _id);
      //Metodo de los formularios reactivos para modificar sus valores
      this.doctorForm.setValue({ nombre:nombre, hospital:_id });
    },(error) => {
      this.router.navigateByUrl(`/dashboard/medicos`);
    });
  }

  loadHospitals() {
    this.hospitalService.cargarHospitales().subscribe(res => {
      this.hospitals = res;
    });
  }

  saveDoctor() {
    //Si tenemos un medico seleccionado, voy a Actualizar, si no lo voy a Crear
    if( this.selectedDoctor ) {
      const data = { ...this.doctorForm.value, _id: this.selectedDoctor._id }
      //console.log("DATA TIENE ", data);
      this.medicoService.actualizarMedico( data ).subscribe(res => {
        Swal.fire('Actualización exitosa', `${ data.nombre } actualizado correctamente`, 'success');
      });
    } else {
      this.medicoService.crearMedico( this.doctorForm.value ).subscribe((res: any) => {
        Swal.fire('Creación exitosa', `${ this.doctorForm.value.nombre } creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${ res.medico._id }`);
      });
    }
  }

}
