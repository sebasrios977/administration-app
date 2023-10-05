import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { canActivateGuard, canMatchGuard } from './services/auth.guard';
import { publicActivateGuard, publicMatchGuard } from './services/not-auth.guard';

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
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [canActivateGuard],
    // canMatch: [canMatchGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
