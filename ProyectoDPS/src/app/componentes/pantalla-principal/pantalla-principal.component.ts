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
    public router: Router
    ) { }

    usu = {
      nombre: null,
      correo: this.usuarioService.usuarioDatos.email,
      fechaNac: null,
      telefono: null,
      tipo: 1
    }

  ngOnInit(){
    this.onRegistradoPHP();
  }

  onRegistradoPHP(){
    this.usuariosphp.verUsuarioCli(this.usuarioService.usuarioDatos.email).subscribe(datos => {
      if(datos['resultado'] == 'OK' && datos['mensaje']== '0'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Haz la configuracion basica para comenzar!',
          showConfirmButton: false,
          timer: 1500
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
}
