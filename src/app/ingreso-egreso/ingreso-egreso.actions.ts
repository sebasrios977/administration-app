import { createAction, props } from "@ngrx/store";
import { Usuario } from "../interfaces/usuario.interface";
import { IngresoEgreso } from "../interfaces/ingreso-egreso.interface";

export const setItems = createAction(
  '[IngresoEgreso] Set Items',
  props<{items: IngresoEgreso[]}>()
);
export const unsetItems = createAction(
  '[IngresoEgreso] Unset Items',
);
