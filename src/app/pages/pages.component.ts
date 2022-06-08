import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  linkTheme = document.querySelector('#theme'); //Id en index.html

  constructor() { }

  ngOnInit(): void {
    const theme = localStorage.getItem( 'theme' ) || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute( 'href', theme );
  }

}
