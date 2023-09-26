import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Usuario } from '../interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth: Auth, private firestore: Firestore) { }


  initAuthListener() {
    this.auth.onAuthStateChanged( user => user);
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

  isAuth(): boolean {
    return this.auth.currentUser !== null;
  }

}
