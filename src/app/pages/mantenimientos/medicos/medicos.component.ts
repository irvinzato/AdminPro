import { Component, OnInit } from '@angular/core';

import { Medico } from './../../../models/medico.model';
import { MedicoService } from './../../../services/medico.service';
import { ModalImageService } from './../../../services/modal-image.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  doctors: Medico [] = [];
  load: boolean = true;

  constructor( private medicoService: MedicoService, private modalImageService: ModalImageService ) { }

  ngOnInit(): void {
    this.loadingDoctors();
  }

  loadingDoctors() {
    this.load = true;
    this.medicoService.obtenerMedicos().subscribe(res => {
      this.doctors = res;
      this.load = false;
    });
  }

  openModal( doctor: Medico ) {
    this.modalImageService.abrirModal( 'medicos', doctor._id, doctor.img );
  }

}
