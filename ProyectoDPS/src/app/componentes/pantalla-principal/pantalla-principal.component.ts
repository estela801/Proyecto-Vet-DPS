import { Component, OnInit, NgZone } from '@angular/core';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import { Usuariosphp } from '../../modelos/usuariosPHP/usuariosphp';
import { HttpClient } from '@angular/common/http';
import { UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service';
import Swal from 'sweetalert2';
import { Router} from '@angular/router';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css']
})
export class PantallaPrincipalComponent implements OnInit {

  usuarios = null;
  constructor(
    public usuarioService: UsuarioService,
    private usuariosphp: UsuarioPHPService,
    public router: Router,
    public ngZone: NgZone
    ) { }

    usu = {
      nombre: null,
      correo: this.usuarioService.usuarioDatos.email,
      fechaNac: null,
      telefono: null,
      tipo: 1
    }

  usuarioPHP : Usuariosphp;

  mascotaRegistrada : boolean;

  ngOnInit(){
    this.onRegistradoPHP();
    this.onObtener(this.usuarioService.usuarioDatos.email);
    this.tenerMascota(this.usuarioService.usuarioDatos.email);
  }

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
}
