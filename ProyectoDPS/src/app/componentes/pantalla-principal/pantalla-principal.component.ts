import { Component, OnInit, NgZone } from '@angular/core';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import { Usuariosphp } from '../../modelos/usuariosPHP/usuariosphp';
import { HttpClient } from '@angular/common/http';
import { UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service';
import Swal from 'sweetalert2';
import { Router} from '@angular/router';
import { throws } from 'assert';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css']
})
export class PantallaPrincipalComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    private usuariosphp: UsuarioPHPService,
    public router: Router,
    public ngZone: NgZone
    ) { }

  usuarioPHP : Usuariosphp = new Usuariosphp;

  mascotaRegistrada : boolean;

  ngOnInit(){
    this.onRegistradoPHP();
    this.onObtener(this.usuarioService.usuarioDatos.email);
    this.tenerMascota(this.usuarioService.usuarioDatos.email);
  }

  //Si no esta registrado en MySQL
  onRegistradoPHP(){
    this.usuariosphp.verUsuarioCli(this.usuarioService.usuarioDatos.email).subscribe(datos => {
      if(datos['resultado'] == 'OK' && datos['mensaje']== '0'){
        Swal.fire({
          title: 'Configuracion inicial',
          text: "¡Bienvenido!\n Antes de iniciar realicemos las configuraciones iniciales",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Hacer configuración!',
          cancelButtonText: 'Salir'
        }).then((result) => {
          if (result.isConfirmed) {
            this.ngZone.run(() => {
              this.router.navigate(['configuracion-usuario']);
            });
          }else{
            this.usuarioService.cerrarSesion();
          }
        })
      }else if(datos['resultado'] == 'OK' && datos['mensaje'] == '1'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Si estas registrado!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo paso, intenta de nuevo más tarde!!',
          footer: '<a href>Why do I have this issue?</a>'
        }).then(() =>{
          this.router.navigate(['registrate']);
          }
        )
      }
    })
  }
//Obtener los datos del usuario
  onObtener(correo : string){
    this.usuariosphp.obtenerIniciado(correo).subscribe(result => this.usuarioPHP = result[0]);
  }

  tenerMascota(correo:string){
    this.usuariosphp.tenerMascota(correo).subscribe( datos => {
      if(datos["resultado"] == "NO" && datos["mascota"]==0){
        this.mascotaRegistrada = false;
      }else {
        this.mascotaRegistrada = true;
      }
    })
  }

  //Si no hay mascota registrada al iniciar 
  enlaceMascotas(){
    Swal.fire({
      title: 'Submit your Github username',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      this.usuariosphp.enlaceMascota(this.usuarioService.usuarioDatos.email, result.value ).subscribe(datos => {
        if(datos["resultado"] == "NO" && datos["msg"] == 0){
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Revisa el código proporcionado por tu veterrinario",
            timer: 3000
          })
        }else if(datos["resultado"] == "Error" && datos["msg"] == "NO"){
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Intenta más tarde",
            timer: 3000
          })  
        }else if(datos["resultado"] == "OK" && datos["msg"]== "datos grabados"){
          Swal.fire({
            icon: "success",
            title: "Exito",
            text: "Datos guardados con exito!",
            timer: 3000
          }).then(() => {
            this.tenerMascota(this.usuarioService.usuarioDatos.email);
          })  
        }
      })
    })
  }
}
