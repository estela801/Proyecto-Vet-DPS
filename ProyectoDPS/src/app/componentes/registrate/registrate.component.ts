import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuarios/usuario';
@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent implements OnInit {

  constructor(public usuarioService : UsuarioService, private router: Router) { }

  ngOnInit(): void {
    
  }

  /*onVerificando(correo, contra, contraConfima){
    if(correo == null || correo== "" || correo==" "){
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No ha introducido su correo electronico'
        })
    }else if(contra == null || contra == "" || correo== " "){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña no puede quedar vacia!'
      })
    }else if(contra != contraConfima){
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'La confimación de la contraseña ha sido fallida, por favor vuelve a intentarlo'
      })
    }else{
      this.usuarioService.registrate(correo, contra);
    }
  }*/

  async onRegistro(correo, contra, contraConfirma){
    if(correo == null || correo== "" || correo==" "){
        Swal.fire({
          icon: 'error',
          title: 'Error!',
         text: 'No ha introducido su correo electronico'
        })
    }else if(contra == null || contra == "" || correo== " "){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña no puede quedar vacia!'
      })
    }else if(contra != contraConfirma){
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'La confimación de la contraseña ha sido fallida, por favor vuelve a intentarlo'
      })
    }else{
      try{
        const usuario = await this.usuarioService.registro(correo, contra);
        if(usuario){
          this.verificoUsuario(usuario);
        }
      }catch(error){
        console.log();
      }
    }
  }

  verificoUsuario(usuario : Usuario){
    if (usuario && usuario.emailVerified) {
      this.router.navigate(['pantalla-principal']);
    } else if (usuario) {
      this.router.navigate(['verificacion-correo']);
    } else {
      this.router.navigate(['registrate']);
    }
  }
}
