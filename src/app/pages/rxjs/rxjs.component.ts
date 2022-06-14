import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { 
    /* this.retornaObervable().pipe(
      retry(1)
    ).subscribe( 
    valor => console.log('Subs: ', valor),
    err => console.warn('Error: ', err),
    () => console.info('Observable terminado')
    ); */
    this.retornaIntervalo().subscribe( (valor) => console.log("Valor es ", valor) )
  }

  ngOnInit(): void {
  }

  retornaIntervalo(): Observable<number> {
    return interval(1000)
          .pipe(
            take(4),   //take dice cuantas emisiones del Observable necesito
            map( valor => { //map transforma la informacion que resibe el Observable y mutarla a lo que necesito
              return valor + 1;
            })
          );
  }

  retornaObervable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>( observer => {
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }
        if( i === 2 ) {
          console.log('i es igual a 2, error');
          observer.error('i llego al valor de 2 que tome como error');
        }
      }, 1000);
    });
    return obs$;  //Puedo hacer de esta manera el return o como en la funcion "retornaIntervalo()"
  }

}
