import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Hospital } from './../../../models/hospital.model';
import { BusquedasService } from './../../../services/busquedas.service';
import { HospitalService } from './../../../services/hospital.service';
import { ModalImageService } from './../../../services/modal-image.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  hospitals: Hospital [] = [];
  load: boolean = true;
  imgSubs!: Subscription;

  constructor( private hospitalService: HospitalService, private modalImageService: ModalImageService,
               private busquedaServie: BusquedasService ) { }

  ngOnInit(): void {
    this.loadingHospitals();

    this.imgSubs = this.modalImageService.nuevaImagen
                  .pipe(delay(200))
                  .subscribe( res => this.loadingHospitals() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  
  loadingHospitals() {
    this.load = true;
    this.hospitalService.cargarHospitales().subscribe(res => {
      this.hospitals = res;
      this.load = false;
    });
  }

  searchHospitals( event: any ) {
    //console.log(event);
    if( event.target.value.trim().length === 0 ) {
      this.loadingHospitals();
      return;
    }
    this.busquedaServie.buscar( 'hospitales', event.target.value ).subscribe( res => {
      this.hospitals = res;
    });
  }

  updateHospital( hospital: Hospital ) {
    this.hospitalService.actualizarHospital( hospital._id!, hospital.nombre ).subscribe(res => {
      Swal.fire('Actualizado correctamente', hospital.nombre, 'success');
    });
  }

  deleteHospital( hospital: Hospital ) {
    Swal.fire({
      title: 'Eliminar hospital',
      text: `¿Estas seguro de eliminar a ${ hospital.nombre }?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.hospitalService.borrarHospital( hospital._id! ).subscribe(res => {
          Swal.fire('Eliminación correcta de', hospital.nombre, 'success');
          this.loadingHospitals();
        });
      }
    });
  }

  async openSweetInputType() {
    const value = await Swal.fire({
      title: 'Crear hospital',
      inputLabel: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });
    //console.log("Sweet regreso ", value);
    if( value.isConfirmed && value.value.trim().length !== 0) {
      this.hospitalService.crearHospital( value.value ).subscribe((res: any) => {
        Swal.fire('Creación correcta de ', res.hospital.nombre , 'success');
        this.loadingHospitals();
      });
    }
  }

  openModal( hospital: Hospital ) {
    this.modalImageService.abrirModal( 'hospitales', hospital._id!, hospital.img );
  }

}
