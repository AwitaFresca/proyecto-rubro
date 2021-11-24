import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import {FormBuilder, Validators} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { ProductoService } from 'src/app/services/producto.service';
import { StorageService } from 'src/app/services/storage.service';

import { Producto } from 'src/models/productos.interface';
import { ProductosComponent } from '../productos/productos.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  productos$ = this.productoService.productos;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  public productos: Producto[]=[];
  form;
  
  static id: string;
  click: any;
  config: any;
  collection = {Data: [this.productos] }
  

  constructor(
    private productoService: ProductoService,
    private storageService: StorageService,
    private storage: AngularFireStorage,
    private router: Router,
    private formBuilder: FormBuilder) { 
      //EL FORM ES DECLARADO COMO "form"
      this.form = formBuilder.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        precio: ['', Validators.required],
        url: ['', Validators.required],
        id: '',
   
      });


    }

    public uploadPercent!: Observable<number>;
    public urlImage!: Observable<string>;
    public image:string = '';

    ngOnInit(): void {
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.productos.length
      }


      this.productoService.productos
      .subscribe((respuesta) =>{
        this.productos = respuesta;
        console.log(this.productos);
      })
      
    }

    //FUNCION PARA CREAR UN PRODUCTO
    submit() {
      if (this.form.valid) {
        //console.log(this.form.value);
        
        this.form.value.url = this.image;
        console.log(this.form.value);

        this.productoService.createProducto(this.form.value, this.image);
        this.form.reset();
      }
      else{
        alert("Llene todos los campos")
        
      }
    }

    //FUNCION PARA BORRAR UN PRODUCTO EN ESPECIFICO
    async borrarProducto(proId: string): Promise<void> {
      try{
        await this.productoService.borrarProducto(proId);
        alert('Producto eliminado')
      }
      catch (err){
        console.log(err);

      }
    }

  
    seleccionarProducto(producto: Producto){
      //llenar form con los datos de un producto en especifico para editar
      this.form.setValue({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        url: producto.url
      })
    }

    //FUNCION PARA EDITAR UN PRODUCTO
    public actualizarProducto(prodId: string) {
      console.log(prodId);
      this.productoService.actualizarProducto(prodId, this.form.value);
      this.form.reset();
    }

    pageChanged(event: any){
      this.config.currentPage = event;
    }

    /*
    imagenes: any[] = [];

    cargarImagen(event:any){
      let archivos = event.target.files
      let reader = new FileReader();
      let nombre = "jonathan";
      
      reader.readAsDataURL(archivos[0]);
      reader.onloadend = () => {
        console.log(reader.result);
        this.imagenes.push(reader.result);
        this.storageService.subirImagen(nombre + "_", reader.result).then(urlImagen =>{
          console.log(urlImagen);
    
        })
      }

      
    }

    */
  
  //FUNCION PARA CARGAR UNA IMAGEN LOCAL
  cargarImagen(e: any){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/producto_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  cerrarModal(){
    this.form.reset();
    
  }

}
