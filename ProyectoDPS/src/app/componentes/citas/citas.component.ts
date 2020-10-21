import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import { CitaService } from '../../servicios/citas/cita.service';
import { Citas } from '../../modelos/citas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  cita : Citas = new Citas();
  constructor(
    public usuarioService : UsuarioService,
    public citaService : CitaService
  ) { }

  ngOnInit(): void {
  }


  agregarCita(){
    this.cita.correo_vet = this.usuarioService.usuarioDatos.email.value;
    this.citaService.insertarCita(this.cita).subscribe((datos) => {
      if(datos["msg"]=="1"){
        Swal.fire({
          icon: 'warning',
          title: 'Tiempo no disponible',
          text: 'Al rededor de las '+this.cita.hora+" tienes otra cita programada!"
        })
      }else if(datos["msg"] == "2"){
        Swal.fire({
          icon: 'warning',
          title: 'Id de mascota no reconocido',
          text: 'El id # '+this.cita.id_mascota+" no ha sido reconocido, por favor verifica el id de mascota."
        })
      } else if(datos["msg"] == "OK"){
        Swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Cita programada con exito !'
        }).then(() => {
          (<HTMLFormElement>document.getElementById("citas")).reset();
        })
      }
    })
  }


}
