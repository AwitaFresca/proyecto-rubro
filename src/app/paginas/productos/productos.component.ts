import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/models/productos.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos: Producto[]=[];
  carousel: any;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {

    this.productoService.productos
      .subscribe((respuesta) =>{
        this.productos = respuesta;
        console.log(this.productos);
      })
      
  }

 

}
