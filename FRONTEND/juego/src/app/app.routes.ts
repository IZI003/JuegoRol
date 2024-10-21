import { Routes } from '@angular/router';
import { RegistroComponent } from './negocio/registro/registro.component';

export const routes: Routes = [
    { path: 'registrarse', component:RegistroComponent},
    { path: '**', redirectTo: 'registrarse' , pathMatch : 'full' },
];