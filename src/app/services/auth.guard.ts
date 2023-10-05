//se importa esta libreria para poder inyectar dependencias sin constructor de clase
import { inject } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from './auth.service';


const checkAuthStatus = (): boolean => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);



  if(authService.isLoadedUser) {
    return true;

    } else {
      router.navigate(['/login']);
      return false;
    }
}
  // return authService.isAuth()
  // .pipe(
  //   map( auth => {
  //     if(auth) {
  //       return true;
  //     } else {
  //       router.navigate(['/login']);
  //       return false;
  //     }
  //   })
  // )


//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateGuard: CanActivateFn = (
  //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = (
  //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  return checkAuthStatus();
};
