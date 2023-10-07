import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { publicActivateGuard, publicMatchGuard } from './services/not-auth.guard';
import { privateActivateGuard, privateMatchGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicActivateGuard],
    canMatch: [publicMatchGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [publicActivateGuard],
    canMatch: [publicMatchGuard],
  },
  {
    path: '',
    canActivate: [privateActivateGuard],
    canMatch: [privateMatchGuard],
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then(m => m.IngresoEgresoModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
