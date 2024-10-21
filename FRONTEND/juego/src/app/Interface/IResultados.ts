
export interface IResultados {
    mensaje: string;
    codigoError: string;
    error: ierror;
    ok: boolean;
}

export interface IResponseR {
    datos : IResultados;
    error: ierror;
    estado: string;
}

export interface IResponseL {
    datos : ILoginRespons;
    error: ierror;
    estado: string;
}
export interface ILoginRespons {
    id_usuario: number;
    nombre: string;
    token: string;
}
export interface ierror {
    codigoHttp: number;
    codigoInterno: string;
    descripcion: string;
    mensaje: string;
}