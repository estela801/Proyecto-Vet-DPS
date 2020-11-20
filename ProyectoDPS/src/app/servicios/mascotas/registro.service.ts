import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Mascota} from '../../modelos/mascotas/mascota';
import { ApiResponse } from '../../modelos/ApiResponse/api-response';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url = 'https://vet-dps.000webhostapp.com/Recursos/';

  constructor(private http: HttpClient) { }
  registrarMascota(mascota:Mascota){
    return this.http.post(`${this.url}insertMascota.php`,JSON.stringify(mascota),{responseType: 'text'});
  }

 verMascotas(){
   return this.http.get(`${this.url}verMascotas.php`);
 }
 verMascotasc(correo : string){
  return this.http.get(`${this.url}verMascotasC.php?correo=${correo}`);
}
}
