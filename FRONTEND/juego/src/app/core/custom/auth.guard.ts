import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AccesoService } from '../../services/acceso.service';

export const authGuard: CanActivateFn = (route, state) => {
   //  debugger; //lo usamos para debugear
     const token = localStorage.getItem("token") || "";
     const router = inject(Router);

     const accesoService = inject(AccesoService)
     if(token != ""){
          return accesoService.validarToken(token).pipe(
               map(data => {
                    if(data.resultado.estado=="OK"){
                         localStorage.setItem("token", token);
                         return true
                    } else{
                         router.navigate([''])
                         return false;
                    }
               }),
               catchError(error => {
                    router.navigate([''])
                    console.log("error", error.message);

                         return of(false);
               })
          )
     }else {
          // router.navigateByUrl("");
          // return false
          console.log("error2");

          const url = router.createUrlTree([""])
          return url;
     }
  
};