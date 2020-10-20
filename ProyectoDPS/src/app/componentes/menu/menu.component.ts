import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import { Usuariosphp } from '../../modelos/usuariosPHP/usuariosphp';
import {UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service';
import { Usuario } from '../../modelos/usuarios/usuario';
import { Observable } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { Router } from '@angular/router';
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
  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;
  usu : Usuario = new Usuario();
  constructor(
    public usuarioService : UsuarioService,
    public usuarioServicePHP : UsuarioPHPService,
    private router : Router
  ) { }

  ngOnInit() {
    this.onObtener();
    
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
  async onObtener(){
    this.usuarioDatos$.subscribe(datos =>{
      this.usuarioServicePHP.obtenerIniciado(datos.email).subscribe(result => this.usuarioPHP = result[0]);
    console.log(this.usu.email);
    });
    
  }

  cerrarSesion(){
    this.usuarioService.logout();
    this.router.navigate(['inicio-sesion']);
  }
}
