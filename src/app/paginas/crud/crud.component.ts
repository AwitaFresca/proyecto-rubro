import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
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

  public productos: Producto[] = [];
  form;

  static id: string;
  click: any;
  config: any;
  collection = { Data: [this.productos] }


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
  public image: string = '';

  public prodId?: Producto;

  //imagen
  private file?: File;

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.productos.length
    }


    this.productoService.productos
      .subscribe((respuesta) => {
        this.productos = respuesta;
        console.log(this.productos);
      })

  }

  //FUNCION PARA CREAR UN PRODUCTO
  submit() {
    if (this.form.valid) {
      //console.log(this.form.value);


      console.log(this.form.value);

      this.productoService.cargarImagen(this.file!, this.form.value);
      alert("Producto agregado con exito")
      this.form.reset();
      this.file = undefined;
    }
    else {
      //SI EL FORM ESTA VACIO O INCOMPLETO EL ALERT
      alert("Llene todos los campos")

    }
  }

  //FUNCION PARA BORRAR UN PRODUCTO EN ESPECIFICO MEDIANTE EL ID DEL MISMO
  async borrarProducto(proId: string): Promise<void> {
    try {
      await this.productoService.borrarProducto(proId);
      alert('Producto eliminado')
    }
    catch (err) {
      console.log(err);

    }
  }


  seleccionarProducto(producto: Producto) {
    this.prodId = producto;
    const { nombre, precio, descripcion, url } = producto;
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
  async actualizarProducto() {
    //PREGUNTO SI SE SUBE UN ARCHIVO EN EL FILE
    //EN CASO DE QUE NO, SOLAMENTE EDITA LOS CAMPOS DEL FORM
    if (this.file == undefined) {
      this.productoService.actualizarProducto(this.prodId!.id, this.form.value);
      alert('Se ha editado el producto con exito')
      this.form.reset();
    }
    //SI SUBO ALGO AL FILE, ENTONCES LO SUBE AL STORAGE
    else {
      this.productoService.cargarImagen(this.file!, this.form.value, this.prodId!.id)
      this.prodId = undefined;
      this.file = undefined;
      alert('Se ha editado el producto con exito')
      this.form.reset();
    }

  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }







  //OBTIENE AL ARCHIVO QUE LE PUSIMOS EN EL FORM FILE
  obtenerImagen(event: any) {
    this.file = event.target.files[0];

  }

  //AL CERRAR UN MODAL LIMPIA EL FORM
  cerrarModal() {
    this.form.reset();

  }

}
