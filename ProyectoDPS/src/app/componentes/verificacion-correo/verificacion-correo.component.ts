import { Component, OnInit , OnDestroy} from '@angular/core';

import { UsuarioService } from '../../servicios/usuarios/usuario.service'; 
import { Observable } from 'rxjs';
import { Usuario } from '../../modelos/usuarios/usuario'
@Component({
  selector: 'app-verificacion-correo',
  templateUrl: './verificacion-correo.component.html',
  styleUrls: ['./verificacion-correo.component.css']
})
export class VerificacionCorreoComponent implements  OnDestroy, OnInit {

  constructor(public usuarioService : UsuarioService) { }
  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;
  ngOnInit(){
  }
  
  ngOnDestroy(): void {
    this.usuarioService.logout();
  }

  mandarCorreo() : void {
    this.usuarioService.correoVerificacion();
  }
  
}
