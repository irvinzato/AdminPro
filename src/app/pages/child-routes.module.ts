import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaTotalComponent } from './busqueda-total/busqueda-total.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';

import { AdminGuard } from './../guards/admin.guard';

const childRoutes: Routes = [ 
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables rxjs' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings' } },
  { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile' }},
  { path: 'buscar/:term', component: BusquedaTotalComponent, data: { titulo: 'Busqueda Total' }},

  //Mantenimientos
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' }},
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de Medicos' }},
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' }},
  
  //Rutas de Administrador
  { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' }},
 ]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
