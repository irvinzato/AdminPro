import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Medico } from './../../../models/medico.model';
import { BusquedasService } from './../../../services/busquedas.service';
import { MedicoService } from './../../../services/medico.service';
import { ModalImageService } from './../../../services/modal-image.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  doctors: Medico [] = [];
  load: boolean = true;
  imgSubs!: Subscription;

  constructor( private medicoService: MedicoService, private modalImageService: ModalImageService,
               private busquedaService: BusquedasService ) { }
  
  ngOnInit(): void {
    this.loadingDoctors();
    
    this.imgSubs = this.modalImageService.nuevaImagen
                  .pipe(delay(200))
                  .subscribe( res => this.loadingDoctors() );
  }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
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

  searchDoctors( term: string ) {
    if( term.trim().length === 0 ) {
      this.loadingDoctors();
      return;
    }
    this.busquedaService.buscar( 'medicos', term ).subscribe(res => {
      this.doctors = res;
    });
  }

  deleteDoctor( doctor: Medico ) {
    Swal.fire({
      title: 'Eliminar doctor',
      text: `¿Estas seguro de eliminar a ${ doctor.nombre }?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.medicoService.borrarMedico( doctor ).subscribe(res => {
          Swal.fire('Eliminación correcta de', doctor.nombre, 'success');
          this.loadingDoctors();
        });
      }
    });
  }

}
