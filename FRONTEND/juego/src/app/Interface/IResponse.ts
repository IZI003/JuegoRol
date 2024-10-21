
export interface IResponseRegistro {
    resultado: IResponseh;
}

export interface IResponseh
{
    status : string;
    message: string;
    error: string;
}

export interface ApiConfig {
    apiDomain: string;
    apiPort: number;
  }