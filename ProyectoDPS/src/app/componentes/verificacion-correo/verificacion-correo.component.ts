import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../servicios/usuarios/usuario.service'; 
@Component({
  selector: 'app-verificacion-correo',
  templateUrl: './verificacion-correo.component.html',
  styleUrls: ['./verificacion-correo.component.css']
})
export class VerificacionCorreoComponent implements OnInit {

  constructor(public usuarioService : UsuarioService) { }

  ngOnInit(): void {
  }

}
