import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http: HttpClient) { }

  //url = 'http://localhost:80/vetDPS/';
  url = 'https://vet-dps.000webhostapp.com/Recursos/';

  insertarCita(cita){
    return this.http.post(`${this.url}insertarCita.php`, JSON.stringify(cita));
  }

  obtenerCitasVet(usuario : string){
    return this.http.get(`${this.url}verCitasVet.php?correo=${usuario}`);
  }

  obtenerCitasCliente(usuario : String){
    return this.http.get(`${this.url}verCitasCliente.php?correo=${usuario}`);
  }

  obtenerInfoCitas(id: string){
    return this.http.get(`${this.url}obtenerInfoCitas.php?cita=${id}`);
  }

  modificarCitas(citas){
    return this.http.post(`${this.url}modificarCita.php`, JSON.stringify(citas));
  }

  eliminarCita(cita){
    return this.http.post(`${this.url}eliminarCita.php`, JSON.stringify(cita));
  }
}
