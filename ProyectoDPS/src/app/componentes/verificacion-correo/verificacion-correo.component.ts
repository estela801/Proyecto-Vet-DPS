import { Component, OnInit , OnDestroy} from '@angular/core';

import { UsuarioService } from '../../servicios/usuarios/usuario.service'; 
<<<<<<< HEAD
=======
import { Observable } from 'rxjs';
import { Usuario } from '../../modelos/usuarios/usuario'
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
@Component({
  selector: 'app-verificacion-correo',
  templateUrl: './verificacion-correo.component.html',
  styleUrls: ['./verificacion-correo.component.css']
})
export class VerificacionCorreoComponent implements  OnDestroy, OnInit {

  constructor(public usuarioService : UsuarioService) { }
<<<<<<< HEAD

  ngOnInit(): void {
=======
  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;
  ngOnInit(){
  }
  
  ngOnDestroy(): void {
    this.usuarioService.logout();
>>>>>>> 1bd4308e86df555a3018dd6660edde5d8359fbbe
  }

  mandarCorreo() : void {
    this.usuarioService.correoVerificacion();
  }
  
}
