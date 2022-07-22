import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

const routes: Routes = [
  //Pendiente: Revisar ruta vacia que hace match con login
  { path: '', redirectTo:'/dashboard', pathMatch: 'full' },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
