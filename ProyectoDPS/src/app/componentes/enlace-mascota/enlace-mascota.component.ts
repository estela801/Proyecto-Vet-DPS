import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import { Usuario } from '../../modelos/usuarios/usuario';
import { Observable, observable } from 'rxjs';
import { UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-enlace-mascota',
  templateUrl: './enlace-mascota.component.html',
  styleUrls: ['./enlace-mascota.component.css']
})
export class EnlaceMascotaComponent implements OnInit {

  mascota = {codigo : null};
  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;

  constructor( public usuarioService : UsuarioService, public usuariosphp : UsuarioPHPService) { }

  ngOnInit(): void {

  }

  enlace(){
    this.usuarioDatos$.subscribe(info => {
      this.usuariosphp.enlaceMascota(info.email, this.mascota.codigo ).subscribe(datos => {
        if(datos["resultado"] == "NO" && datos["msg"] == 0){
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Codigo:"+ this.mascota.codigo+" no ha asignado!",
            timer: 3000
          })
        }else if(datos["resultado"] == "Error" && datos["msg"] == "NO"){
          Swal.fire({
            icon: "warning",
            title: "Ojo!",
            text: "Este enlazamiento ya está registrado!",
            timer: 3000
          })  
        }else if(datos["resultado"] == "OK" && datos["msg"]== "datos grabados"){
          Swal.fire({
            icon: "success",
            title: "Exito",
            text: "Datos guardados con exito!",
            timer: 3000
          }).then(() => {
            (<HTMLFormElement>document.getElementById("enlace")).reset();
          })  
        }
      })
    })
  }

}
