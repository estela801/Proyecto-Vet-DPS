import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import {Usuario } from '../../modelos/usuarios/usuario';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
 
  public usuario = {
    correo : null,
    contra : null
   };
  constructor(public usuarioService : UsuarioService, private router: Router) { }
 ngOnInit(): void {
    
  } /*

  onVerificando(){
    
    if(this.usuario.correo == null || this.usuario.correo == "" || this.usuario.correo ==" "){
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Usuario no puede estar vacio!'
        })
    }else if(this.usuario.contra == null || this.usuario.contra == "" || this.usuario.contra== " "){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Contraseña no puede estar vacia!'
      })
    }else{
      this.usuarioService.inicioSesion(this.usuario.correo, this.usuario.contra);
      console.log(this.usuarioService.usuarioDatos.email);
    }
  }*/
  async entrar(){
    try {
      const usuario = await this.usuarioService.login(this.usuario.correo, this.usuario.contra);
      if(usuario){
        this.usuarioVerificado(usuario);
      }
    }catch(error){
      console.log(error)
    }
  }
 
  private usuarioVerificado(usuario : Usuario){
    if(usuario && usuario.emailVerified){
      this.router.navigate(['pantalla-principal'])
    }else if(usuario){
      Swal.fire({
        icon : "warning",
        title: "Verificación",
        text: "El correo : "+usuario.email+" No esta verificado! Revisa tu bandeja de entrada"
      })
    }else{
      Swal.fire({
        icon:"error",
        title : "Error",
        text: "El correo : "+usuario.email+" no esta registrado, por favor registrate!",
      })
    }
  }
}
