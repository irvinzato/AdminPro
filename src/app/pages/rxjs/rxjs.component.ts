import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { 
    const obs$ = new Observable( observer => {
      let i = -1;
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }
        if( i === 2 ) {
          observer.error('i llego al valor de 2 que tome como error');
        }
      }, 1000);
    });

    obs$.subscribe( 
    valor => console.log('Subs: ', valor),
    err => console.warn('Error: ', err),
    () => console.info('Observable terminado')
    );
  }

  ngOnInit(): void {
  }

}
