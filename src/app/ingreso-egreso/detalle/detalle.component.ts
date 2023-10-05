import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/interfaces/ingreso-egreso.interface';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, OnDestroy {


  public ingresosEgresos: IngresoEgreso[] = [];

  private unsubscribe!: Subscription;

  constructor(private store: Store<AppState>, private ie: IngresoEgresoService) {}


  ngOnInit(): void {
    this.unsubscribe = this.store.select('ie').subscribe( ({items}) => {
      this.ingresosEgresos = items;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }

  borrar(uid?: string) {
    this.ie.borrarIngresoEgreso(uid!)
    .subscribe( (data) => {
      Swal.fire('Borrado', 'Item borrado', 'success');
    },
    (error) => {
      Swal.fire('Error', error.message, 'error');
    });
  }
}
