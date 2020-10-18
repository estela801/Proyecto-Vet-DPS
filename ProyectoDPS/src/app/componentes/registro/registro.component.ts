import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  title = 'newMat';
     
  isLinear = true;
 Propietario: FormGroup;
Mascota: FormGroup;


  constructor(private _formBuilder: FormBuilder) { }

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
      mapellido: ['', Validators.required],
      tipo: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required]
    });
}
submit(){
  //console.log(this.Propietario.value);
  console.log(this.Mascota.value);
}


}
