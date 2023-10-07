import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/interfaces/ingreso-egreso.interface';
import { ChartData, ChartEvent } from 'chart.js';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  public ingresos: number = 0;
  public egresos: number = 0;
  public totalIngresos: number = 0;
  public totalEgresos: number = 0;

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Egresos',
    'Ingresos',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [],
  };

  private ieDesubscription!: Subscription;

  constructor(private store: Store<AppStateWithIngresoEgreso>) {}

  ngOnInit(): void {
    this.ieDesubscription = this.store.select('ie').subscribe( ({items}) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.ieDesubscription.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;


    for (const item of items) {
      if(item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos += 1;
      } else {
        this.totalEgresos += item.monto;
        this.egresos += 1;
      }
    }

    this.doughnutChartData.datasets = [{ data: [this.totalEgresos, this.totalIngresos ] }]
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
