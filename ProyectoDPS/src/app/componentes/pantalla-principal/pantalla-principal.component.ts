import { Component, OnInit, NgZone } from '@angular/core';
import { UsuarioService } from '../../servicios/usuarios/usuario.service';
import { Usuariosphp } from '../../modelos/usuariosPHP/usuariosphp';
//Se debe importar la clase
import { Usuario } from '../../modelos/usuarios/usuario';
import { UsuarioPHPService } from '../../servicios/usuariosPHP/usuario-php.service';
import { CitaService } from '../../servicios/citas/cita.service'
import Swal from 'sweetalert2';
import { Router} from '@angular/router';
//Para el arreglo
 import { Observable } from 'rxjs';


@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css']
})
export class PantallaPrincipalComponent implements OnInit {
  //Como areglo con los datos del usuario, esto esta en el service, se tiene que importar la lib de observable
  public usuarioDatos$ : Observable<Usuario> = this.usuarioService.afAuth.user;
  usu : any;
  constructor(
    public usuarioService: UsuarioService,
    public usuariosphp: UsuarioPHPService,
    public router: Router,
    public ngZone: NgZone,
    public citaService : CitaService
    ) { }

  usuarioPHP : Usuariosphp = new Usuariosphp;
  mascotaRegistrada : boolean;
  consultas = null;
  consultas2 = null;
  consul =null ;

  ngOnInit(){
    this.onRegistradoPHP();
  }

  //Obtener los datos del usuario
  onObtener(correo : string){
    this.usuariosphp.obtenerIniciado(correo).subscribe(result => 
      {
        this.usuarioPHP = result[0];
        this.tenerMascota(correo);
        if(this.usuarioPHP.tipo == 2){
          
          this.consultasVet(correo);
        }else{
      
         this.consultasCliente(correo);
      }
      });
    
    
  }

  consultasVet(correo : string){
    this.citaService.obtenerCitasVet(correo).subscribe(datos  => this.consultas = datos);
    console.log(this.consultas);
  }

  consultasCliente(usuario:string){
    this.citaService.obtenerCitasCliente(usuario).subscribe(datos => this.consultas2 = datos);
  }

  verMasCitas(id:string){

    this.citaService.obtenerInfoCitas(id).subscribe(datos =>{
      this.consul = datos[0]
      
      Swal.fire({
        title: 'Cita para del '+ this.consul.fecha ,
        html: '<b>Mascota ID : </b>'+this.consul.registro_mascota+'</br>'+
              '<b>Nombre Mascota : </b>'+this.consul.mascota+'</br>'+
              '<b>Hora : </b>'+this.consul.hora+'</br>'+
              '<b>Veterinario : </b>'+this.consul.vet+'</br>'+
              '<b>Descripcion : </b>'+this.consul.descripcion+'</br>'+
              '<a href="mailto:'+this.consul.correo_usuario+'?Subject=Consulta%20para%20'+this.consul.fecha+'%20con%20mascota%20ID%20'+this.consul.registro_mascota+'">Contactar por correo al veterinario</a>',
        scrollbarPadding: false
      })
    });
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

  //Si no esta registrado en MySQL
  onRegistradoPHP(){
    //el arrglo con los datos del usuario le hacemos subscribe para que con sus datos podamos llenar las funciones 
    this.usuarioDatos$.subscribe(info =>{
      //En este caso en la variable info van los datos, asi que info.email es el email del usuario
    this.usuariosphp.verUsuarioCli(info.email).subscribe(datos => {
      if(datos['resultado'] == 'OK' && datos['mensaje']== '0'){
        Swal.fire({
          title: 'Configuracion inicial',
          text: "¡Bienvenido!\n Antes de iniciar realicemos las configuraciones iniciales",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Hacer configuración!',
          cancelButtonText: 'Salir'
        }).then((result) => {
          if (result.isConfirmed) {
            this.ngZone.run(() => {
              this.router.navigate(['configuracion-usuario']);
              this.onObtener(info.email);
            });
          }else{
            this.usuarioService.logout();
          }
        })
      }else if(datos['resultado'] == 'OK' && datos['mensaje'] == '1'){
          this.onObtener(info.email);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo paso, intenta de nuevo más tarde!!',
          footer: '<a href>Why do I have this issue?</a>'
        }).then(() =>{
          this.router.navigate(['registrate']);
          }
        )
      }
    })
    })
  }


  tenerMascota(correo:string){
    this.usuariosphp.tenerMascota(correo).subscribe( datos => {
      if(datos["resultado"] == "NO" && datos["mascota"]==0){
        this.mascotaRegistrada = false;
      }else {
        this.mascotaRegistrada = true;
      }
    })
  }

  //Si no hay mascota registrada al iniciar 
  enlaceMascotas(){
    this.usuarioDatos$.subscribe(info => {
      Swal.fire({
        title: 'Ingresa el codigo tu mascota!, Recuerda este codigo fue dado por tu veterinario.',
        input: 'number',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Ingresar',
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        this.usuariosphp.enlaceMascota(info.email, result.value ).subscribe(datos => {
          if(datos["resultado"] == "NO" && datos["msg"] == 0){
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Revisa el código proporcionado por tu veterrinario",
              timer: 3000
            })
          }else if(datos["resultado"] == "Error" && datos["msg"] == "NO"){
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Intenta más tarde",
              timer: 3000
            })  
          }else if(datos["resultado"] == "OK" && datos["msg"]== "datos grabados"){
            Swal.fire({
              icon: "success",
              title: "Exito",
              text: "Datos guardados con exito!",
              timer: 3000
            }).then(() => {
              this.tenerMascota(info.email);
            })  
          }
        })
      })
    })
  }
}
