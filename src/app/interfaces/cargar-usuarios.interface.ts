import { Usuario } from './../models/usuario.model';

//Recordar que los nombres deben ser iguales a la respuesta de mi BACKEND
export interface CargarUsuarios {
    totalRegistros: number;
    usuarios: Usuario[];
}