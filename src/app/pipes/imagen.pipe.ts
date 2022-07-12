import { Pipe, PipeTransform } from '@angular/core';

import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(value: string = '', tipo: 'usuarios'|'medicos'|'hospitales'): string {

    if( !value || value === '' ) {
      return `${ baseUrl }/upload/${ tipo }/no-image`;
    } else if( value.includes('https') ) {
      return value;
    } else if( value ) {
      return `${ baseUrl }/upload/${ tipo }/${value}`;
    } else {
      return `${ baseUrl }/upload/${ tipo }/no-image`;
    }
  }

}
