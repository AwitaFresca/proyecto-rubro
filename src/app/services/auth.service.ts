import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }


  async login(email:string, password:string){
    try{
      //Logueamos con el email y contraseña obtenidos
      return await this.auth.signInWithEmailAndPassword(email, password);
    }catch (err){
      //Si el email y contraseña no estan registrados devuelve error
      console.log("error en login: ",err);
      return null;
    }
  }

  //Obtenemos al usuarios logueado 
  getUserLogged(){
    return this.auth.authState;
  }

  //Funcion para salir de la sesion
  logout(){
    this.auth.signOut();
  }
}
