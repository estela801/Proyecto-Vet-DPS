import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:80/vetDPS/';

  insertarCita(cita){
    return this.http.post(`${this.url}insertarCita.php`, JSON.stringify(cita));
  }
}
