import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD

=======
import { Usuario } from '../../modelos/usuarios/usuario';
import { Observable }from 'rxjs';
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
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

<<<<<<< HEAD
  usuariosphp = null;
  usu = {
    correo:this.usuarioService.usuarioDatos.email,
    nombre:null,
    fechaNac: null,
    telefono: null,
    tipo : 1
  }

  hoy:number = Date.now();
=======
  ahora = new Date();
  mes = this.ahora.getMonth();
  formattedDate : any = this.ahora.getFullYear() +'-'+ this.mes +'-'+ this.ahora.getDay();

  /*mesNac:number = null;
  diaNac : number = null;
  anioNac : number = null;*/ 

  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;
  usuario  : Usuario = new Usuario();

  usuariosphp = null;
  usu = {
      correo:null,
      nombre:null,
      fechaNac: this.formattedDate,
      telefono: null,
      tipo : 1
      }
    

 
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
  constructor(
    public usuarioService : UsuarioService,
    public usuariosPHPService : UsuarioPHPService,
    public router : Router
    ) { }

<<<<<<< HEAD
  ngOnInit(): void {
=======
   
  ngOnInit(): void {
    //this.usuarioDatos$.subscribe(datos => this.usuario = datos[0]);
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
  }


  configPHP(){
<<<<<<< HEAD
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
=======
    this.usuarioDatos$.subscribe(info => {
      this.usu.correo = info.email;
      if(this.usu.nombre == null || this.usu.fechaNac == null || this.usu.telefono == null){
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
    });  
  }

>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
}
