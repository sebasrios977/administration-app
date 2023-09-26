import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
              ) {}

  loginUsuario(){
    const {correo, password} = this.loginForm.value;

    // Loader
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.loginUsuario(correo, password)
    .then( () => {
      Swal.close();
      this.router.navigateByUrl('/');
    })
    .catch( error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } );
  }
}
