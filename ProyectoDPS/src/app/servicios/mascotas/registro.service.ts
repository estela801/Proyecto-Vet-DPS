import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Mascota} from '../../modelos/mascotas/mascota';
import { ApiResponse } from '../../modelos/ApiResponse/api-response';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url = 'http://localhost:80/vetDPS/';

  constructor(private http: HttpClient) { }
  registrarMascota(mascota:Mascota){
    return this.http.post(`${this.url}insertMascota.php`,JSON.stringify(mascota),{responseType: 'text'});
  }

 
}