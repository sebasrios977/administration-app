import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

import * as ie from 'src/app/ingreso-egreso/ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public name: string = '';

  private sideBarUnsubscribe!: Subscription;
  constructor(
      private authService: AuthService,
      private router: Router,
      private store: Store<AppState>
      ) {}

  ngOnInit(): void {
    this.sideBarUnsubscribe = this.store.select('auth').subscribe( ({user}) => {
      this.name = user?.name || 'Usuario';
    })
  }

  ngOnDestroy(): void {
    this.sideBarUnsubscribe.unsubscribe();
  }

  logout() {
    this.store.dispatch( ie.unsetItems() );
    Swal.fire({
      title: 'Cerrando sesion',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.logout()
    .then( () => {
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
