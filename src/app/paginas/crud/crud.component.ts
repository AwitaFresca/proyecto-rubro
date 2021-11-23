import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
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
    private router: Router,
    private formBuilder: FormBuilder) { 
      this.form = formBuilder.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        precio: ['', Validators.required],
        url: ['', Validators.required],
        id: '',
   
      });


    }

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
    submit() {
      if (this.form.valid) {
        console.log(this.form.value);
        this.productoService.createProducto(this.form.value);
        this.form.reset();
      }
      else{
        alert("Llene todos los campos")
      }
    }

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
      //llenar form para editar
      this.form.setValue({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        url: producto.url
      })
    }

    public actualizarProducto(prodId: string) {
      console.log(prodId);
      this.productoService.actualizarProducto(prodId, this.form.value);
    }

    pageChanged(event: any){
      this.config.currentPage = event;
    }

    // subir imagen
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

   

}
