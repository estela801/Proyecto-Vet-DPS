import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuarios/usuario';
import { Observable }from 'rxjs';
import { UsuariovetService } from '../../servicios/usuariovet/usuariovet.service';
import {UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service';
import { Usuariosphp } from '../../modelos/usuariosPHP/usuariosphp';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.css']
})
export class VeterinarioComponent implements OnInit {

  ahora = new Date();
  mes = this.ahora.getMonth();
  formattedDate : any = this.ahora.getFullYear() +'-'+ this.mes +'-'+ this.ahora.getDay();

  /*mesNac:number = null;
  diaNac : number = null;
  anioNac : number = null;*/ 

 
  usuario  : Usuario = new Usuario();

  usuariosphp = null;
  usu = {
      correo:null,
      nombre:null,
      fechaNac: this.formattedDate,
      telefono: null,
      tipo : 2
      }
    

  
  constructor(
    public usuarioService : UsuariovetService,
    public usuariosPHPService : UsuarioPHPService,
    public router : Router
    ) { }
 
   
  ngOnInit(): void {
    //this.usuarioDatos$.subscribe(datos => this.usuario = datos[0]);
  }


  configPHP(form : NgForm){
    
     
      if( this.usu.correo == null ||this.usu.nombre == null || this.usu.fechaNac == null || this.usu.telefono == null){
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No puedes dejar datos vacios!'
        })
      }else{
      this.usuariosPHPService.insertarPHP(this.usu).subscribe(datos => {
        if(datos['resultado'] == 'OK'){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Veterinario agregado con éxito!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
          form.resetForm();
            this.router.navigate(['veterinario']);
          })
        } if(datos['resultado'] == "NO"){
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: ''+datos["mensaje"]
            })
          }
        })
      } 
     
  }
  

 
}
