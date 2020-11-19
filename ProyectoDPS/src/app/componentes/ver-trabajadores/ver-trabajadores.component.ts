import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuarios/usuario';
import { Observable }from 'rxjs';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import {UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service'
import { Usuariosphp } from '../../modelos/usuariosPHP/usuariosphp';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-trabajadores',
  templateUrl: './ver-trabajadores.component.html',
  styleUrls: ['./ver-trabajadores.component.css']
})
export class VerTrabajadoresComponent implements OnInit {


  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;
  public consultas = null;
  totalConsultas : number;
  page : number = 1;

  constructor(
    public usuarioService : UsuarioService,
    public usuarioPHP : UsuarioPHPService,
  ) { }

  ngOnInit(): void {
    this.verTrabajadores();
  }
  
 verTrabajadores(){
    this.usuarioDatos$.subscribe(info => {
      this.usuarioPHP.obtenerTrabajadores().subscribe(datos => {
        this.consultas = datos;
        this.totalConsultas = datos.propertyIsEnumerable.length;
        console.log("El lenght es de "+this.totalConsultas);
      });
    })
   
  }

  hayRegistros() {
    return true;
    }
}



