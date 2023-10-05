import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  private loadingSubscription!: Subscription;

  public isLoading: boolean = false;
  public myForm: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    monto: ['', Validators.required],
    tipo: ['ingreso', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private ie: IngresoEgresoService,
    private store: Store<AppState>
  ) {}


  ngOnInit(): void {
    this.loadingSubscription = this.store.select('ui').subscribe( ui => {
      this.isLoading = ui.isLoading;
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  tipo(type: string) {
    this.myForm.controls['tipo'].setValue(type);
  }

  guardar(){
    this.store.dispatch( ui.isLoading() );
    this.ie.crearIngresoEgreso(this.myForm.value)
    .then( () => {
      Swal.fire('Registro creado', this.myForm.controls['descripcion'].value, 'success');
      this.myForm.reset();
      this.tipo('ingreso');
      this.store.dispatch( ui.stopLoading() );
    })
    .catch( error => {
      this.store.dispatch( ui.stopLoading() );
      Swal.fire('Error', error.message, 'error');
    });
  }
}
