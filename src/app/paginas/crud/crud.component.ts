import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/models/productos.interface';
import { ProductosComponent } from '../productos/productos.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  public productos: Producto[]=[];
  form;
  static id: string;
  click: any;
  

  constructor(private productoService: ProductoService,
    private formBuilder: FormBuilder) { 
      this.form = formBuilder.group({
        nombre: ['', Validators.required],
        url: ['', Validators.required],
        id: '',
   
      });
    }

    ngOnInit(): void {
      this.productoService.productos
      .subscribe((respuesta) =>{
        this.productos = respuesta;
        console.log(this.productos);
      })
      
    }
    submit() {
      if (this.form.valid) {
        console.log(this.form.value)
        this.productoService.createProducto(this.form.value)
      }
      else{
        alert("FILL ALL FIELDS")
      }
    }

    borrarProducto() {
      this.productoService.borrarProducto(this.click.value).then(() => {
        console.log('Documento eliminado!');
      }, (error) => {
        console.error(error);
      });
    }

    

}
