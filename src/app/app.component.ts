import { Component } from '@angular/core';
import { Producto } from 'src/models/productos.interface';
import { AuthService } from './services/auth.service';
import { ProductoService } from './services/producto.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-rubro';
  public productos: Producto [] = [];

  userLogged = this.authService.getUserLogged();

  constructor(private productoService:ProductoService,
    private authService: AuthService){

  }

  

  logout(){
    this.authService.logout();
    alert('Ha cerrado sesion')
  }
}
