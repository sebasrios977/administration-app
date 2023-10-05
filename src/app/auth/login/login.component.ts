import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

// Redux
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private uiSubscription!: Subscription;
  public loading: boolean = false;

  public loginForm: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
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

  loginUsuario(){
    const {correo, password} = this.loginForm.value;

    this.store.dispatch( ui.isLoading() );
    this.authService.loginUsuario(correo, password)
    .then( () => {
      // Swal.close();
      this.store.dispatch( ui.stopLoading() );
      this.router.navigateByUrl('/');
    })
    .catch( error => {
      this.store.dispatch( ui.stopLoading() );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } );
  }
}
