import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagenPipe } from './imagen.pipe';


//Es bueno tener el propio modulo de los pipes por si al dia de mañana crece mucho esta seccion de mi aplicación
@NgModule({
  declarations: [
    ImagenPipe
  ],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
