import { ierror } from "./IResultados";

export interface IPerfilEntrada{
    nombre: string;
    email: string;
    telefono: string;
    usuario: string;
    password: string;
}

export interface IPerfilSalida{
    resultado: IResponseP;
}

export interface IPerfil{
    nombre: string;
    email: string;
    telefono: string;
    usuario: string;
    password: string;
    password2: string;
}

    export interface IResponseP {
        datos : IPerfil;
        error: ierror;
        estado: string;
    }