import { Component, OnInit } from '@angular/core';
import { UsuarioPHPService } from '../../../servicios/usuariosPHP/usuario-php.service'
import { UsuarioService } from '../../../servicios/usuarios/usuario.service';
import { CitaService } from '../../../servicios/citas/cita.service';
import { Citas } from '../../../modelos/citas';
import { Usuario } from '../../../modelos/usuarios/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ver-total-citas',
  templateUrl: './ver-total-citas.component.html',
  styleUrls: ['./ver-total-citas.component.css']
})
export class VerTotalCitasComponent implements OnInit {

  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;
  public consultas = null;

  constructor(
    public usuarioService : UsuarioService,
    public usuarioPHP : UsuarioPHPService
    ) { }

  ngOnInit(): void {
    this.obtenerConsultas();
  }

  obtenerConsultas(){
    this.usuarioDatos$.subscribe(info => {
      this.usuarioPHP.obtenerCitasVet(info.email).subscribe(datos => this.consultas = datos);
    })
   
  }

  hayRegistros() {
    return true;
    }
}
