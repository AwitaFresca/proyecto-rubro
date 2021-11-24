import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { CrudComponent } from './paginas/crud/crud.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LoginComponent } from './paginas/login/login.component';
import { PageNotFoundComponent } from './paginas/page-not-found/page-not-found.component';

import { ProductosComponent } from './paginas/productos/productos.component';

const routes: Routes = [
  {
    pathMatch:'full',
    path:"", redirectTo: 'inicio'
  },
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
  {
    path:"login", component:LoginComponent
  },
  {
    path:"**", component:PageNotFoundComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
