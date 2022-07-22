import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BusquedasService } from './../../services/busquedas.service';
import { Hospital } from './../../models/hospital.model';
import { Medico } from './../../models/medico.model';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-busqueda-total',
  templateUrl: './busqueda-total.component.html',
  styleUrls: ['./busqueda-total.component.css']
})
export class BusquedaTotalComponent implements OnInit {

  users: Usuario[] = [];
  doctors: Medico[] = [];
  hospitals: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute, private busquedasService: BusquedasService,
               private router: Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      console.log(params.term);
      this.globalSearch( params.term );
    });
  }

  globalSearch( term: string ) {
    this.busquedasService.busquedaGlobal( term ).subscribe((res: any) => {
      this.users     = res.usuarios;
      this.doctors   = res.medicos;
      this.hospitals = res.hospitales;
    });
  }

  openDoctor( doctor: Medico ) {
    this.router.navigateByUrl(`/dashboard/medico/${ doctor._id }`);
  }

}
