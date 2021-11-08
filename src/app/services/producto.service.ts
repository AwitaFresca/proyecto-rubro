import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/models/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  doc(proId: string) {
    throw new Error('Method not implemented.');
  }
  public productos!: Observable<Producto[]>;
  public productoCollection!: AngularFirestoreCollection<Producto>;

  constructor(private firestore: AngularFirestore) { 
    this.productoCollection = this.firestore.collection<Producto>('productos');
    console.log(this.productoCollection);
    this.obtenerProductos();
  }
  //obtiene todos los cursos de la base de datos
  obtenerProductos() {
    this.productos = this.productoCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as Producto))
    )
  }
  //obtiene un curso de la base de datos por el id
  obtenerProducto(idCurso: string) {

  }
  public getProductoById(prodId: string) {
    return this.firestore.collection('productos').doc(prodId).snapshotChanges();
  }

  public createProducto(prod: Producto): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.firestore.createId();
        prod.id = id;
        const result = await this.productoCollection?.doc(id).set(prod);
        resolve(result)
      }
      catch (err) {
        reject(err)
      }
    })
}



  actualizarProducto(idCurso: string, data: Producto) {


  }

  agregarProducto(data: Producto) {


  }

  public borrarProducto(proId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.productoCollection?.doc(proId).delete();
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
}

