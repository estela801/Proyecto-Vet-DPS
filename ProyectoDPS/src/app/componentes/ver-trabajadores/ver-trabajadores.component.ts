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
  i : number;
  mod = null;
  array = null;
  trabajadores= {nombre : null, fechaNac: null, telefono : null, correo_usuario : null};
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



    
     //modificar Trabajadores
     modificarVet(correo : string){
      this.usuarioPHP.obtenerTrabajadoresm(correo).subscribe(async datos => {
        this.mod = datos[0];
       this.array = this.mod.telefono.split("-");
        this.trabajadores.correo_usuario = correo;
       const { value:formValues} = await Swal.fire({
          title: "Modificacion de Usuarios",
          html: '<b>Correo: </b>'+this.mod.correo_usuario+'</br>'+
                '<label>Nombre:</label>'+
                //Aqui solo declare un input, es lo mismo que en html
                '<input type="text" id="nombre" value="'+this.mod.nombre+'" class="form-control">'+
                '<label>Fecha de Nacimiento:</label>'+
                '<input type="date" id="fechaNac" value="'+this.mod.fechaNac+'" class="form-control">'+
                '<label>Telefono:</label>'+
                '<div class="row" style="margin-left:10%;">'+            
                '<input type="text" id="telefono" maxlength="4" value="'+this.array[0]+'"class="form-control col-4"> '+
                '<label style="font-size: 30px; text-align: center;"><strong>-</strong></label>'+
                '<input type="text" id="telefono2" maxlength="4" value="'+this.array[1]+'"class="form-control col-4">'+
                '</div>',
               
          focusConfirm: false,
          preConfirm: () => {
            return [
              //Aqui asigno los valores de los inputs con los id que les puse en el sweet alert
              this.trabajadores.nombre = $('#nombre').val(),
              this.trabajadores.fechaNac = $('#fechaNac').val(),
              this.trabajadores.telefono= $('#telefono').val()+"-"+$('#telefono2').val(),
             
            
            ]
          }
        })

        if (formValues) {
         this.usuarioPHP.modificarUsuario(this.trabajadores).subscribe(datos => {
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
              html: '<h2>Veterinario Modificado con éxito</h2>'
            }).then(() => this.verTrabajadores());
          }
         });
        }
      });
    }
}



