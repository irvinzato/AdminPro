export interface Usuario {
    nombre: string;
    email: string;

    password?: string;
    google?: boolean;
    img?: string;
    rol?: string;
    uid?: string; 
}

/*  OTRA MANERA DE IMPLEMENTARLO 
export class Usuario {
    constructor(
        nombre: string;
        email: string;

        password?: string;
        google?: boolean;
        img?: string;
        rol?: string;
        uid?: string;    
    ) {}
}
*/