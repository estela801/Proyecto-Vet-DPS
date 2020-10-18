import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Mascota} from '../../modelos/mascotas/mascota';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url = 'http://localhost:80/vetDPS/';

  constructor(private http: HttpClient) { }

  registrarMascota(mascota: Mascota){
    return this.http.post(`${this.url}/insertMascota.php`,mascota);
  }
}
