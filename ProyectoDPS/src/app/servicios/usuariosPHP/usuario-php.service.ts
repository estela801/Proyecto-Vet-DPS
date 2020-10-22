import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuariosphp } from '../../modelos/usuariosPHP/usuariosphp'

@Injectable({
  providedIn: 'root'
})
export class UsuarioPHPService {

  url = 'http://localhost:80/vetDPS/';
  constructor(private http: HttpClient) { }
  
  verUsuarioCli(correo : string){
    return this.http.get(`${this.url}existo.php?correo=${correo}`);
  }

  insertarPHP(usuarios){
    return this.http.post(`${this.url}insertarUsuario.php`, JSON.stringify(usuarios));
  }
<<<<<<< HEAD
=======

  obtenerIniciado(correo : string){
    return this.http.get(`${this.url}obtener.php?correo=${correo}`);
  }

  tenerMascota(correo : string){
    return this.http.get(`${this.url}tenerMascota.php?correo=${correo}`);
  }

  enlaceMascota(usuario : string, mascota: string){
    return this.http.get(`${this.url}enlaceMascota.php?mascota=${mascota}&usuario=${usuario}`);
  }
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
}