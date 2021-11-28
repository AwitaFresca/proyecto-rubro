import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Producto } from 'src/models/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public productos!: Observable<Producto[]>;
  public productoCollection!: AngularFirestoreCollection<Producto>;
  public filePath: string = '';
  private urlImage:string = '';

  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) { 
    this.productoCollection = this.firestore.collection<Producto>('productos');
    console.log(this.productoCollection);
    this.obtenerProductos();
  }
  //obtiene todos los productos de la base de datos
  obtenerProductos() {
    this.productos = this.productoCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as Producto))
    )
  }

  //obtiene un producto de la base de datos por el id
  public getProductoById(prodId: string) {
    return this.firestore.collection('productos').doc(prodId).snapshotChanges();
  }

  public createProducto(prod: Producto/*, image:string*/): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.firestore.createId();
        prod.id = id;
        /*
        console.log(Image)
        prod.url = image;
        */
        const result = await this.productoCollection?.doc(id).set(prod);
        resolve(result)
      }
      catch (err) {
        reject(err)
      }
    })
}



  public actualizarProducto(prodId: string, data: any) {
    return this.firestore.collection('productos').doc(prodId).set(data);
  }

  
  cargarImagen(file: File, producto: Producto, idProducto?:string ){
    
    //nombro a la ruta a donde quiero que se guarde la imagen
    const filePath = `Imagenes/productos/${file.name}`;
    //Creo la referencia de la imagen
    const ref = this.storage.ref(filePath);
    //Y subo la imagen a storage
    const task = this.storage.upload(filePath, file);

    //Obtengo la referencia de la imagen (la URL)
    task.snapshotChanges().pipe(finalize(() => {
      ref.getDownloadURL().subscribe((url =>{
        this.urlImage = url;
        //Aqui agrego la URL de la imagen al producto
        producto.url = this.urlImage;
        //De esta forma se si quiero editar o agregar un producto, si viene un id lo edito, si no creo un producto nuevo
        if(idProducto){
          this.actualizarProducto(idProducto, producto)
        }
        else{
          this.createProducto(producto);
        }
        
      }))
    })).subscribe();
    
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


