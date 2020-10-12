import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../servicios/usuarios/usuario.service';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrls: ['./configuracion-usuario.component.css']
})
export class ConfiguracionUsuarioComponent implements OnInit {

  constructor(public usuarioService : UsuarioService) { }

  ngOnInit(): void {
  }

}
