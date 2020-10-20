import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
 
  public usuario = {
    correo : null,
    contra : null
   }
  constructor(public usuarioService : UsuarioService, private router: Router) { }
  ngOnInit(): void {
    
  }

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
  }
}
