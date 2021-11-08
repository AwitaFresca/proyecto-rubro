import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './paginas/crud/crud.component';
import { ProductosComponent } from './paginas/productos/productos.component';

const routes: Routes = [
  {
    path:"productos", component:ProductosComponent
  },
  {
    path:"crud", component:CrudComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
