import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {Mascota} from './../../modelos/mascotas/mascota';
import  {RegistroService} from '../../servicios/mascotas/registro.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
     
  isLinear = true;
 //Propietario: FormGroup;
rmascota: FormGroup;
mascotaModel= new Mascota()



  constructor(private _formBuilder: FormBuilder, private mascotasServicio: RegistroService,
   public router: Router,  ) { }

  ngOnInit() {
   
    this.rmascota = this._formBuilder.group({
      nombre: ['', Validators.required],
      registro_mascota: ['', Validators.required],
      tipo: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required]
    });
}


Onsubmit(){
  //console.log(this.rmascota.value);


  this.mascotasServicio.registrarMascota(this.rmascota.value).subscribe( data => {

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
