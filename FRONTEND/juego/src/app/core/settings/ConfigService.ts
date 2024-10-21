import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
    port: number;
  dominio: string;
}

@Injectable({
  providedIn: 'root',
})

export class ConfigService {
  private config: Config | undefined;

  constructor(private http: HttpClient) {}
  /*loadConfig(): Promise<Config> {
    if (!this.config) {
      this.config = this.http
        .get<Config>('./appconfig.json');
    }
    return this.config;
  }*/

  getConfig(): Config {
    if (!this.config) {
      throw new Error('La configuración aún no está cargada.');
    }
    return this.config;
  }
}
