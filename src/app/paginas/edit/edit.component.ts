import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/models/productos.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public productos: Producto[]=[];
  form;
  
  static id: string;
  value: { [k: string]: any; } | undefined;

  constructor(private productoService: ProductoService,
    private router: Router,
    private formBuilder: FormBuilder) { 
      const navigation = this.router.getCurrentNavigation();
      this.value = navigation?.extras?.state;

      this.form = formBuilder.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        url: ['', Validators.required],
        id: '',
   
      });

      
    }

    ngOnInit(): void {
     if (typeof this.productos == 'undefined'){
       this.router.navigate(['crud']);
     } else {
       this.form.patchValue(this.productos);
     }
      
    }

    

    
    volverAtrasCrud(): void{
      this.router.navigate(['crud']);

    }


    

}



