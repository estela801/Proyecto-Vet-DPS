import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Mascota} from './../../modelos/mascotas/mascota';
import  {RegistroService} from '../../servicios/mascotas/registro.service';
import Swal from 'sweetalert2';
//import {MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { NullTemplateVisitor } from '@angular/compiler';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
 // title = 'newMat';
     
  isLinear = true;
 Propietario: FormGroup;
Mascota: FormGroup;
mascotaModel =
{
  nombre:null,
  registro_mascota:null,
  edad: null,
  tipo: null,
  raza: null,
  sexo:null
}

  constructor(private _formBuilder: FormBuilder, private mascotasServicio: RegistroService,
   public router: Router,  ) { }

  ngOnInit() {
    /*this.Propietario = this._formBuilder.group({
      dui: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['',Validators.required]
     
    });*/
    this.Mascota = this._formBuilder.group({
      mnombre: ['', Validators.required],
      nregistro: ['', Validators.required],
      tipo: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required]
    });
}

//mascotaModel = new Mascota ("","","","","", undefined)

submit(){
  //console.log(this.Propietario.value);
  //console.log(this.Mascota.value);
  this.mascotasServicio.registrarMascota(this.mascotaModel).subscribe(() => {

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Mascota Registrada',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.router.navigate(['registro']);
    })

  });
 
  
}


}
