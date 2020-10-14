import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent implements OnInit {

  constructor(public usuarioService : UsuarioService) { }

  ngOnInit(): void {
  }

  onVerificando(correo, contra, contraConfima){
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
  }
  
}
