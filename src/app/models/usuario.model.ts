//Para usar todas las propiedades que tiene este modelo o clase se debe instancear cuando se ocupe "... = new Usuario()"
//Es muy parecido a mis interfaces
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
