import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any = null;

  constructor(private http: HttpClient) {}

  // Método para cargar la configuración
  loadConfig() {
    return firstValueFrom(
      this.http.get('/assets/config.json')
    ).then((config) => {
      this.config = config;
    });
  }

  // Método para obtener la URL de la API
  get apiUrl() {
    return this.config?.apiUrl;
  }
}
