import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import {UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service';
import { Usuariosphp } from '../../modelos/usuariosPHP/usuariosphp';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrls: ['./configuracion-usuario.component.css']
})
export class ConfiguracionUsuarioComponent implements OnInit {

  usuariosphp = null;
  usu = {
    correo:this.usuarioService.usuarioDatos.email,
    nombre:null,
    fechaNac: null,
    telefono: null,
    tipo : 1
  }

  hoy:number = Date.now();
  constructor(
    public usuarioService : UsuarioService,
    public usuariosPHPService : UsuarioPHPService,
    public router : Router
    ) { }

  ngOnInit(): void {
  }


  configPHP(){
    this.usuariosPHPService.insertarPHP(this.usu).subscribe(datos => {
      if(datos['resultado'] == 'OK'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Configuracion realizada con exito!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['pantalla-principal']);
        })
      }
    })
  }
}
