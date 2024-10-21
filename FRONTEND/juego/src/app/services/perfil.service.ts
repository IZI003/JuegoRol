import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerfilEntrada } from '../Interface/IPerfil';
import { IResponseh } from '../Interface/IResponse';
import { ConfigService } from './config.service';
import { appSettings } from '../core/settings/appSetings';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private http = inject(HttpClient);
  private BaseUrl : string = appSettings.apiUrl;
  
    constructor() { }
   registrarse(objeto:IPerfilEntrada) : Observable<IResponseh>{
    return this.http.post<IResponseh>(`${this.BaseUrl}v1/usuarios/`, objeto)
   }
}
