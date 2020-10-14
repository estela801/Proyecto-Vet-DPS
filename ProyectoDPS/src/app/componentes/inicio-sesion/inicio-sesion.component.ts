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

  constructor(public usuarioService : UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  onVerificando(correo, contra){
    if(correo == null || correo== "" || correo==" "){
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Usuario no puede estar vacio!'
        })
    }else if(contra == null || contra == "" || correo== " "){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Contraseña no puede estar vacia!'
      })
    }else{
      this.usuarioService.inicioSesion(correo, contra);
    }
  }
}
