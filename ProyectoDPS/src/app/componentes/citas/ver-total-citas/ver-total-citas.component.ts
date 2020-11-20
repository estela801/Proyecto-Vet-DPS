import { Component, OnInit } from '@angular/core';
import { UsuarioPHPService } from '../../../servicios/usuariosPHP/usuario-php.service'
import { UsuarioService } from '../../../servicios/usuarios/usuario.service';
import { CitaService } from '../../../servicios/citas/cita.service';
import { Citas } from '../../../modelos/citas';
import { Usuario } from '../../../modelos/usuarios/usuario';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
//Se importa el jquery para poder hacer uso del '$'
import * as $ from 'jquery';

@Component({
  selector: 'app-ver-total-citas',
  templateUrl: './ver-total-citas.component.html',
  styleUrls: ['./ver-total-citas.component.css']
})
export class VerTotalCitasComponent implements OnInit {

  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;
  public consultas = null;
  public totalConsultas : number;
  page : number = 1;
  consul= null;
  mod = null;

  citas = {fecha : null, hora : null, correo_vet : null, id: null};

  constructor(
    public usuarioService : UsuarioService,
    public usuarioPHP : UsuarioPHPService,
    public citaService : CitaService
    ) { }

  ngOnInit(): void {
    this.obtenerConsultas();
  }
 
  obtenerConsultas(){
    this.usuarioDatos$.subscribe(info => {
      this.usuarioPHP.obtenerCitasVet(info.email).subscribe(datos => {
        this.consultas = datos;
        this.totalConsultas+=1;
        console.log("El lenght es de "+this.totalConsultas);
        this.citas.correo_vet = info.email;
      });
    })
    
   
  }

  hayRegistros() {
    return true;
    }

    verMasCitasV(id:string){
      this.citaService.obtenerInfoCitas(id).subscribe(datos =>{
        this.consul = datos[0]
        
        Swal.fire({
          title: 'Cita para del '+ this.consul.fecha ,
          html: '<b>Mascota ID : </b>'+this.consul.registro_mascota+'</br>'+
                '<b>Nombre Mascota : </b>'+this.consul.mascota+'</br>'+
                '<b>Hora : </b>'+this.consul.hora+'</br>'+
                '<b>Descripcion : </b>'+this.consul.descripcion+'</br>',
          scrollbarPadding: false
        })
      });
    }

    modificarCitas(id:string){
      this.citaService.obtenerInfoCitas(id).subscribe(async datos => {
        this.mod = datos[0];
        this.citas.id = id;
       const { value:formValues} = await Swal.fire({
          title: "Modificacion de Citas",
          html: '<b>Mascota : </b>'+this.mod.mascota+'</br>'+
                '<b>Mascota ID : </b>'+this.mod.registro_mascota+'</br>'+
                '<label>Fecha de la cita:</label>'+
                //Aqui solo declare un input, es lo mismo que en html
                '<input type="date" id="fecha_cita" value="'+this.mod.fecha+'" class="form-control">'+
                '<label>Hora de la cita:</label>'+
                '<input type="time" id="hora_cita" value="'+this.mod.hora+'" class="form-control">',
          focusConfirm: true,
          showCloseButton: true,
          confirmButtonText: 'Modificar cita',
          preConfirm: () => {
            return [
              //Aqui asigno los valores de los inputs con los id que les puse en el sweet alert
              this.citas.fecha = $('#fecha_cita').val(),
              this.citas.hora = $('#hora_cita').val()
            ]
          }
        })

        if (formValues) {
         this.citaService.modificarCitas(this.citas).subscribe(datos => {
          if(datos["msg"]=="1"){
            Swal.fire({
             
              icon: 'warning',
              title: 'Tiempo no disponible',
              text: 'Al rededor de las '+this.citas.hora+" tienes otra cita programada!"
            })
          }else if(datos["msg"]=="OK"){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              html: '<h2>Cita modificada con exito</h2>'
            }).then(() => this.obtenerConsultas());
          }
         });
        }
      });
    }

    eliminarCita(id:string){
      this.citas.id = id;
      Swal.fire({
        title: 'Está seguro de eliminar esta cita?',
        html: "<h3>El cambio será irreversible!</h3>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar cita.',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          return this.citaService.eliminarCita(this.citas).subscribe(datos => {
            if(datos["msg"]=="OK"){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                html: '<h2>Elimando Cita...</h2>'
              }).then(() => this.obtenerConsultas());
            }
          });
        }
      })
      
    }
}
