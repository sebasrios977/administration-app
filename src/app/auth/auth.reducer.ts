import { createReducer, on } from "@ngrx/store";
import * as auth from './auth.actions';
import { Usuario } from "../interfaces/usuario.interface";

export interface State {
  user: Usuario | null,
}
export const initialState: State = {
  user: null,
}

export const authReducer = createReducer(initialState,
  on(auth.setUser, (state, {user} ) => ({...state, user: {...user} })),
  on(auth.unsetUser, state => ({...state, user: null})),
)
