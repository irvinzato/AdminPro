import { Component, OnInit } from '@angular/core';

import { SettingsService } from './../services/settings.service';

//Para declarar una funcion que esta de manera global en la aplicacion, en este caso esta en "./assets/js/custom.js"
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {


  constructor( private settingService: SettingsService ) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
