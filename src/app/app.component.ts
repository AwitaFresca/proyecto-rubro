import { Component } from '@angular/core';
import { Producto } from 'src/models/productos.interface';
import { ProductoService } from './services/producto.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-rubro';
  public productos: Producto [] = [];
  constructor(private productoService:ProductoService){

  }
}
