import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  linkTheme = document.querySelector('#theme'); //Id en index.html

  constructor() {
    console.log("Solo con inyectarlo en otro archivo arranca el servicio");
    const theme = localStorage.getItem( 'theme' ) || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute( 'href', theme );
   }

   changeTheme( theme: string ) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute( 'href', url );
    localStorage.setItem( 'theme', url );
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    //Esto no se debe hacer cuando por cada llamado consume muchos elementos del DOM, pero para este caso son pocos y es para optimizar el codigo
    const links = document.querySelectorAll('.selector');
    links.forEach( element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if( btnThemeUrl === currentTheme ) {
        element.classList.add('working');
      }
    });
  }

}
