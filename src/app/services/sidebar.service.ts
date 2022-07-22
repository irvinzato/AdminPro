import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  /* Lo pase por respuesta de autenticación en mi BackEnd 
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/dashboard/progress' },
        { titulo: 'Gráfica', url: '/dashboard/grafica1' },
        { titulo: 'Promesas', url: '/dashboard/promesas' },
        { titulo: 'Rxjs', url: '/dashboard/rxjs' },
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/dashboard/usuarios' },
        { titulo: 'Medicos', url: '/dashboard/medicos' },
        { titulo: 'Hospitales', url: '/dashboard/hospitales' }
      ]
    }
  ]; */

  constructor( private router: Router ) { }

  //Remplazo el menu que tenia antes por el que me proporciona mi BackEnd en la respuesta de autenticación
  loadingMenu() {
    //Lo vuelvo a parsear por que para guardarlo lo hice string
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
    //console.log("MENU ", this.menu);
    //Hacer pruebas
    if( this.menu.length === 0 ) {
      this.router.navigateByUrl('/login');
    } 
  }
}
