import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

//Redux
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private uiSubscription!: Subscription;

  public loading: boolean = false;
  public myForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>,
              ) {}

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe( ({isLoading}) => this.loading = isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    if(this.myForm.invalid) return;
    this.store.dispatch( ui.isLoading() );
    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const {nombre, correo, password} = this.myForm.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then( () => {
        // Swal.close();
        this.store.dispatch( ui.stopLoading() );
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
