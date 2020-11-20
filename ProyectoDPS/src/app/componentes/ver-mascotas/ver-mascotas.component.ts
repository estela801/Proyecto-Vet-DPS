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
  selector: 'app-ver-mascotas',
  templateUrl: './ver-mascotas.component.html',
  styleUrls: ['./ver-mascotas.component.css']
})
export class VerMascotasComponent implements OnInit {

  
  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;
  public consultas = null;
  totalConsultas : number;
  page : number = 1;
  mod = null;

  mascotas= {nombre : null, edad : null, tipo : null, raza : null, sexo : null, id: null};

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
      this.mascota.verMascotas().subscribe(datos => {
        this.consultas = datos;
        this.totalConsultas = datos.propertyIsEnumerable.length;
        console.log("El lenght es de "+this.totalConsultas);
      });
    })
   
  }

  hayRegistros() {
    return true;
    }
 
    //modificar Mascotas
    modificarMascotas(id:string){
      this.mascota.verMascotasm(id).subscribe(async datos => {
        this.mod = datos[0];
        this.mascotas.id = id;
       const { value:formValues} = await Swal.fire({
          title: "Modificacion de Citas",
          html: '<b>Mascota: </b>'+this.mod.registro_mascota+'</br>'+
                '<label>Nombre:</label>'+
                //Aqui solo declare un input, es lo mismo que en html
                '<input type="text" id="nombre" value="'+this.mod.nombre+'" class="form-control">'+
                '<label>Edad:</label>'+
                '<input type="number" id="edad" value="'+this.mod.edad+'" class="form-control">'+
                '<label>Tamaño:</label>'+
                '<input type="text" id="tamaño" value="'+this.mod.tipo+'" class="form-control">'+
                '<label>Raza:</label>'+
                '<input type="text" id="raza" value="'+this.mod.raza+'" class="form-control">'+
                '<label>Sexo:</label>'+
                '<input type="text" id="sexo" value="'+this.mod.sexo+'" class="form-control">',
          focusConfirm: false,
          preConfirm: () => {
            return [
              //Aqui asigno los valores de los inputs con los id que les puse en el sweet alert
              this.mascotas.nombre = $('#nombre').val(),
              this.mascotas.edad = $('#edad').val(),
              this.mascotas.tipo = $('#tamaño').val(),
              this.mascotas.raza = $('#raza').val(),
              this.mascotas.sexo = $('#sexo').val(),
            
            ]
          }
        })

        if (formValues) {
         this.mascota.modificarMascota(this.mascotas).subscribe(datos => {
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
              html: '<h2>Mascota Modificada con éxito</h2>'
            }).then(() => this.verMascotas());
          }
         });
        }
      });
    }




}
