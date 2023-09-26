import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
      private authService: AuthService,
      private router: Router,
      ) {}

  logout() {
    Swal.fire({
      title: 'Cerrando sesion',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.logout()
    .then( credenciales => {
      Swal.close();
      this.router.navigateByUrl('/login');
    })
    .catch( error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    });
  }


}
