import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { CrudComponent } from './paginas/crud/crud.component';
import { InicioComponent } from './paginas/inicio/inicio.component';

import { ProductosComponent } from './paginas/productos/productos.component';

const routes: Routes = [
  {
    path:"productos", component:ProductosComponent
  },
  {
    path:"crud", component:CrudComponent
  },
  {
    path:"inicio", component:InicioComponent
  },
  {
    path:"contacto", component:ContactoComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
