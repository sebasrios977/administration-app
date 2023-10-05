import { createReducer, on } from "@ngrx/store";
import * as ingresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from "../interfaces/ingreso-egreso.interface";

export interface State {
  items: IngresoEgreso[],
}
export const initialState: State = {
  items: [],
}

export const ingresoEgresoReducer = createReducer(initialState,
  on(ingresoEgreso.setItems, (state, {items} ) => ({ ...state, items: [...items] })),
  on(ingresoEgreso.unsetItems, state => ({ ...state, items: [] })),
)
