import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  myForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
              private firestore: Firestore,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
              ) {}

  crearUsuario() {
    if(this.myForm.invalid) return;

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const {nombre, correo, password} = this.myForm.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then( () => {
        Swal.close();
        this.router.navigateByUrl('/');
      })
      // .catch( error => {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: error.message,
      //   })
      // } );
  }
}
