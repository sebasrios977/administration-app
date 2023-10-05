import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subject, Subscription, filter, switchMap, takeUntil } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ie from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();
  private userSubs!: Subscription;


  constructor( private store: Store<AppState>,
                private ie: IngresoEgresoService) {}


  ngOnInit(): void {
    this.userSubs = this.store
      .select('auth')
      .pipe(
        filter((auth) => auth.user != null),
        switchMap(({ user }) => this.ie.initIngresosEgresosListener(user!.uid)),
        takeUntil(this.unsubscribe),
      )
      .subscribe( (ingresoEgresoFB: any) => {
        this.store.dispatch( ie.setItems({items: ingresoEgresoFB }) );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.userSubs.unsubscribe();
  }
}
