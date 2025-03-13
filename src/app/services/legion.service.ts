// Servicio para gestionar la colección de Legion en Firebase
import { Injectable, inject } from '@angular/core';
import { Legion } from '../models/legion.model';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class LegionService {
  private db: Firestore = inject(Firestore);
  private collectionPath = 'legiones';

  constructor() { }

  // Método para obtener todos los documentos de la colección
  getLegiones() {
    const legionesCollection = collection(this.db, this.collectionPath);
    return collectionData(legionesCollection, { idField: 'id' }).pipe(first());
  }

  // Método para agregar un nuevo documento
  agregarLegion(legion: Legion) {
    const legionesCollection = collection(this.db, this.collectionPath);
    return addDoc(legionesCollection, {
      titulo: legion.titulo,
      autor: legion.autor,
      precio: legion.precio
    });
  }

  // Método para modificar un documento existente
  modificarLegion(legion: Legion) {
    const documentRef = doc(this.db, this.collectionPath, legion.id);
    return updateDoc(documentRef, {
      titulo: legion.titulo,
      autor: legion.autor,
      precio: legion.precio
    });
  }

  // Método para eliminar un documento
  eliminarLegion(id: string) {
    const documentRef = doc(this.db, this.collectionPath, id);
    return deleteDoc(documentRef);
  }
}