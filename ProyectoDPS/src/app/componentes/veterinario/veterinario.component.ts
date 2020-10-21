import { Component, OnInit } from '@angular/core';

import {  UsuariovetService } from '../../servicios/usuariovet/usuariovet.service';
import {UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.css']
})
export class VeterinarioComponent implements OnInit {

  ahora = new Date();
  mes = this.ahora.getMonth();
  formattedDate : any = this.ahora.getFullYear() +'-'+ this.mes +'-'+ this.ahora.getDay();

  mesNac:number = null;
  diaNac : number = null;
  anioNac : number = null;

  usuariosphp = null;
  usu = {
    correo:null,
    nombre:null,
    fechaNac: this.formattedDate,
    telefono: null,
    tipo : 2
  }

  hoy:number = Date.now();

 
  constructor(
    public usuarioService : UsuariovetService,
    public usuariosPHPService : UsuarioPHPService,
    public router : Router,
    
    ) { }

  ngOnInit(): void {
  }

  registrar(correo, contra, contraConfima){
    this.onVerificando(correo, contra, contraConfima);
    this.configPHP();
    
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

  configPHP(){
    if(this.usu.nombre == null || this.usu.fechaNac == null || this.usu.telefono == null || this.usu.correo == null ){
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No puedes dejar datos vacios!'
      })
    }else{
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
      } if(datos['resultado'] == "NO"){
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: ''+datos["mensaje"]
          })
        }
      })
    }
  }


}
