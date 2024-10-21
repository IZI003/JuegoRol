import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import  Swal from 'sweetalert2';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PerfilService } from '../../services/perfil.service';
import { ICliente } from '../../Interface/ICliente';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
 private perfilService = inject(PerfilService);
  public formBuild = inject(FormBuilder);

  public formRegistro: FormGroup = this.formBuild.group({
    usuario: ['',Validators.required],
    email: ['',Validators.required],
    password: ['',Validators.required],
    nombre: ['',Validators.required],
    password2: ['',Validators.required],
    telefono:['',Validators.required],
  })

  registrarse(){
      if(this.formRegistro.invalid) return;

      if (this.formRegistro.value.password !== this.formRegistro.value.password2) {
        return Swal.fire({
          icon: 'error',
          title: 'Las contraseñas no coinciden',
        });
      }
      const objeto:ICliente = {
        email: this.formRegistro.value.email,
        password: this.formRegistro.value.password,
        usuario: this.formRegistro.value.usuario,
        nombre: this.formRegistro.value.nombre,
        telefono: this.formRegistro.value.telefono,
        password2: this.formRegistro.value.password2,
      }

   this.perfilService.registrarse(objeto).subscribe({
        next:(datos) =>{
          console.log("Error");

             if(datos.status == 'OK'){
                return Swal.fire({
                  icon: "success",
                  title: "se guardo correctamente",
              });
             }else{
                return Swal.fire({
                  icon: "error",
                  title: datos.message
              });
             }
            },
        error:(error) =>{
          return Swal.fire({
            icon: "error",
            title: error.error.message
        });
        }
   })
   return;
  }
}