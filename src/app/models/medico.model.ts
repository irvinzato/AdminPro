interface _MedicoUser {
    _id: string;
    nombre: string;
    img?: string;
}

interface _MedicoHospital {
    _id: string;
    nombre: string;
    img?: string;
}

export class Medico {

    constructor(
        public _id: string,
        public nombre: string,
        
        public usuario?: _MedicoUser,
        public hospital?: _MedicoHospital,
        public img?: string
    ) {}

}