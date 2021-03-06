import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp } from "firebase/app";

import { environment } from 'src/environments/environment';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireStorageModule} from '@angular/fire/compat/storage'

import { ProductosComponent } from './paginas/productos/productos.component';
import { CrudComponent } from './paginas/crud/crud.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';




import {NgxPaginationModule} from 'ngx-pagination';
import { FooterComponent } from './componentes/footer/footer.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { LoginComponent } from './paginas/login/login.component';
import { PageNotFoundComponent } from './paginas/page-not-found/page-not-found.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    CrudComponent,

    FooterComponent,
     InicioComponent,
     ContactoComponent,
     LoginComponent,
     PageNotFoundComponent,
     NosotrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxPaginationModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
