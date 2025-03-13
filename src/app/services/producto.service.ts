import { Injectable, inject } from '@angular/core';
import { Producto } from '../models/producto.model';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  // Obtener todos los productos
  getProductos() {
    const productosCollection = collection(this.db, 'productos');
    return collectionData(productosCollection, { idField: 'id' }).pipe(first());
  }

  // Agregar nuevo producto
  agregarProducto(producto: Producto) {
    const productosCollection = collection(this.db, 'productos');
    const productoData = {
      descripcion: producto.descripcion,
      precio: producto.precio
    };
    return addDoc(productosCollection, productoData);
  }

  // Modificar producto existente
  modificarProducto(producto: Producto) {
    if (!producto.id) throw new Error('ID de producto requerido para modificar');
    const documentRef = doc(this.db, 'productos', producto.id);
    return updateDoc(documentRef, {
      descripcion: producto.descripcion,
      precio: producto.precio
    });
  }

  // Eliminar producto (versión mejorada)
  eliminarProducto(id: string) {
    if (!id) throw new Error('ID de producto requerido para eliminar');
    const documentRef = doc(this.db, 'productos', id);
    return deleteDoc(documentRef);
  }
}