import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuarios/usuario';
import { Observable }from 'rxjs';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import {UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service'
import { Usuariosphp } from '../../modelos/usuariosPHP/usuariosphp';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {Mascota} from '../../modelos/mascotas/mascota';
import {RegistroService } from '../../servicios/mascotas/registro.service'

@Component({
  selector: 'app-ver-mis-mascotas',
  templateUrl: './ver-mis-mascotas.component.html',
  styleUrls: ['./ver-mis-mascotas.component.css']
})
export class VerMisMascotasComponent implements OnInit {

  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;
  public consultas = null;
  totalConsultas : number;
  page : number = 1;

  constructor(
    public usuarioService : UsuarioService,
    public usuarioPHP : UsuarioPHPService,
    public mascota : RegistroService
  ) { }

  ngOnInit(): void {
    this.verMascotas();
  }
  
 verMascotas(){
    this.usuarioDatos$.subscribe(info => {
      this.mascota.verMascotasc(info.email).subscribe(datos => {
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
