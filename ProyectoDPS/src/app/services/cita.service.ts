import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})

export class CitaService {

  // Traer los datos de firebase
  citaList: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados, del tipo Product
  selectedCita: Cita = new Cita();

  constructor(public firebase: AngularFireDatabase) { }

  // Traer todos los productos desde firebase 
  getCitas() { // guarda los elementos en la varible 'controls'
    return this.citaList = this.firebase.list('citas');
  }

  // crear un nuevo producto  , recibiendo un parametro de tipo Product
  insertCita(cita: Cita) {
    this.citaList = this.firebase.list('citas');
    // agregar un dato al final de la lista, como recibe un objeto del tipo Product , puede acceder a sus propiedades
    this.citaList.push({
      nombre: cita.nombre,
      doctorAsig: cita.doctorAsig,
      situacion: cita.situacion,
      descripcion: cita.descripcion,
      fecha: cita.fecha,
      hora: cita.hora,

    });
  }


  
}
