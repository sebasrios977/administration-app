import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../interfaces/ingreso-egreso.interface';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort( (a, b) => {
      if(a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    })
  }

}
