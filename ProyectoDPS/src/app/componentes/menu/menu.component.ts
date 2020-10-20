import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import { Usuariosphp } from '../../modelos/usuariosPHP/usuariosphp';
import {UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  submenu1 : boolean = false;
  submenu2 : boolean = false;
  submenu3 : boolean = false;
  submenu4 : boolean = false;
  usuarioPHP : Usuariosphp = new Usuariosphp() ;
  constructor(
    public usuarioService : UsuarioService,
    public usuarioServicePHP : UsuarioPHPService
  ) { }

  ngOnInit(): void {
    this.onObtener(this.usuarioService.usuarioDatos.email)
  }
/* Opciones para funcionalidad del menu */
  onsubmenu1(){
    if(this.submenu1) this.submenu1 = false;
    else this.submenu1 = true; 
    this.submenu2 = false;
    this.submenu3 = false;
    this.submenu4 = false;
  }

  onSubmenu2(){
    if(this.submenu2) this.submenu2 = false;
    else this.submenu2 = true;
    this.submenu1 = false;
    this.submenu3 = false;
    this.submenu4 = false;
  }

  onSubmenu3(){
    if(this.submenu3) this.submenu3 = false;
    else this.submenu3 = true;
    this.submenu2 = false;
    this.submenu1 = false;
    this.submenu4 = false;
  }

  onSubmenu4(){
    if(this.submenu4 ) this.submenu4 = false;
    else this.submenu4 = true;
    this.submenu2 = false;
    this.submenu1 = false;
    this.submenu3 = false;
  }
  //Obtener informacion de usuario
  onObtener(correo : string){
    this.usuarioServicePHP.obtenerIniciado(correo).subscribe(result => this.usuarioPHP = result[0]);
    console.log(correo);
  }
}
