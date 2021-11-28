import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variable a desestructurar
  usuario = {
    email: '',
    password: ''
  }


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  //Funcion para iniciar sesion
  ingresar(){
    console.log(this.usuario);
    //desestructuramos la variable usuario
    const { email, password } = this.usuario;
    //Y pasamos las variables
    this.authService.login(email, password).then(res => {
      console.log("Se inicio sesion: ", res);
      alert('Ha iniciado sesion como administrador')
    })
    
  }

}
