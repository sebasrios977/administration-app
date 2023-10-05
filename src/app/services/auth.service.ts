import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

// Redux
import { Store } from '@ngrx/store';
import * as auth from '../auth/auth.actions';
import { AppState } from '../app.reducer';
import { Auth, Unsubscribe, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable, Subject, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoadedUser: boolean = false;
  private _user: Usuario | null = null;

  get user() {
    return {...this._user};
  }

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>,
  )
  {}


  async initAuthListener() {
    this.auth.onAuthStateChanged(async (fUser) => { // Agrega "async" aquí
      if (fUser) {
        const collectionRef = collection(this.firestore, `${fUser.uid}`);
        const documentRef = doc(collectionRef, 'user');
        try {
          const user = await getDoc(documentRef);
          const { name, email, uid } = user.data()!;
          const tempUser: Usuario = { name, email, uid };
          this._user = tempUser;
          this.store.dispatch(auth.setUser({ user: tempUser }));
        } catch (error) {
          console.log(error);
        }
      } else {
        this._user = null;
        this.store.dispatch(auth.unsetUser());
      }
    });
  }

  async crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then(({user}) => {
      const newUser: Usuario = {name: nombre, email: user.email!, uid: user.uid};
      const collectionRef = collection(this.firestore, `${user.uid}`);
      const documentRef = doc(collectionRef, 'user');
      setDoc(documentRef, newUser);
    })
  }

  loginUsuario(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  isAuth() {
    return this.auth.currentUser !== null;
  }
}

