import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, collectionGroup, collectionSnapshots, deleteDoc, doc, docData, getDocs, onSnapshot, query, setDoc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../interfaces/ingreso-egreso.interface';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: Firestore, private authService: AuthService) {}


  async crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    const collectionRef = collection(this.firestore, `${uid}`, 'ingreso-egreso', 'items');
    const documentRef = doc(collectionRef);
    return setDoc(documentRef, {...ingresoEgreso})
  }

  initIngresosEgresosListener(uid: string): Observable<IngresoEgreso[]> {
    const collectionRef = collection(this.firestore, `${uid}`, 'ingreso-egreso', 'items');
    return new Observable<IngresoEgreso[]>(subscriber => {
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
          data.push({
            uid: doc.id,
            ...doc.data(),
          });
        });
        subscriber.next(data);
      });

      return () => unsubscribe();
    });
  }

  borrarIngresoEgreso(uidItem: string): Observable<void> {
    const uid = this.authService.user.uid;
    const collectionRef = collection(this.firestore, `${uid}`, 'ingreso-egreso', 'items');
    const docRef = doc(collectionRef, `${uidItem}`);
    // Convierte la operación asincrónica en un Observable
    const observable = from(deleteDoc(docRef));

    return observable;
  }


}
