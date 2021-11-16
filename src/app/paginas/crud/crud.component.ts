import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
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
  

  constructor(private productoService: ProductoService,
    private router: Router,
    private formBuilder: FormBuilder) { 
      this.form = formBuilder.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
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

    irEdit(item:any): void{
      this.navigationExtras.state = item;
      this.router.navigate(['edit'], this.navigationExtras);
    }

    

}
