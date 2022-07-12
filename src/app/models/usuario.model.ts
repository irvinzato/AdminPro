//Para usar todas las propiedades que tiene este modelo o clase se debe instancear cuando se ocupe "... = new Usuario()"
//Es muy parecido a mis interfaces
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,

        public password?: string,
        public google?: boolean,
        public img?: string,
        public rol?: string,
        public uid?: string   
    ) {}

    imprimirNombre() {
        console.log( "Nombre de usuario ", this.nombre );
    }

    get imagenUrl(){
        if( !this.img ) {
            return `${ baseUrl }/upload/usuarios/no-image`;
        }
        if( this.img?.includes('https') ) {
            return this.img;
        }
        if( this.img ) {
            return `${ baseUrl }/upload/usuarios/${ this.img }`;
        } else {
            return `${ baseUrl }/upload/usuarios/no-image`;
        }
    }

}


/* OTRA MANERA DE IMPLEMENTARLO, DE ESTA MANERA NO SE INSTANCIA
export interface Usuario {
    nombre: string;
    email: string;

    password?: string;
    google?: boolean;
    img?: string;
    rol?: string;
    uid?: string; 
} */
